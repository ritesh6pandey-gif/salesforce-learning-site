---
sidebar_position: 5
title: Inbound Apex REST and SOAP
description: Exposing custom endpoints from Salesforce with Apex REST and Apex SOAP web services.
---

# Inbound Apex REST and SOAP

Sometimes the standard Salesforce REST/SOAP APIs (covered in
[Salesforce APIs](./salesforce-apis.md)) don't match what an external system expects —
maybe it needs a custom payload shape, or needs to trigger multi-object business logic
in one call. That's what **Apex REST** and **Apex SOAP web services** are for: you
write the endpoint, Salesforce exposes it.

## Apex REST

Annotate a class with `@RestResource` and its methods with the HTTP verb they handle:

```apex
@RestResource(urlMapping='/OrderIntake/*')
global with sharing class OrderIntakeService {

    @HttpPost
    global static ResponseWrapper createOrder() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;

        Map<String, Object> payload =
            (Map<String, Object>) JSON.deserializeUntyped(req.requestBody.toString());

        try {
            Order__c order = new Order__c(
                External_Id__c = (String) payload.get('externalId'),
                Amount__c = (Decimal) payload.get('amount')
            );
            insert order;

            res.statusCode = 201;
            return new ResponseWrapper(order.Id, 'created');
        } catch (Exception e) {
            res.statusCode = 400;
            return new ResponseWrapper(null, 'error: ' + e.getMessage());
        }
    }

    global class ResponseWrapper {
        global Id recordId;
        global String status;
        ResponseWrapper(Id recordId, String status) {
            this.recordId = recordId;
            this.status = status;
        }
    }
}
```

This becomes reachable at:

```
POST /services/apexrest/OrderIntake/
Authorization: Bearer <access_token>
Content-Type: application/json

{ "externalId": "EXT-4821", "amount": 199.99 }
```

## Apex SOAP web services

For SOAP, annotate a class `global` with `WebService` methods. Salesforce
auto-generates a WSDL you hand to the consuming system:

```apex
global class LegacyOrderService {
    webservice static String createOrder(String externalId, Decimal amount) {
        Order__c order = new Order__c(
            External_Id__c = externalId,
            Amount__c = amount
        );
        insert order;
        return order.Id;
    }
}
```

SOAP services are less common for new work — most teams reach for Apex REST unless an
existing SOAP-only consumer requires it.

## Request flow

```mermaid
sequenceDiagram
    participant Ext as External System
    participant SF as Salesforce (Apex REST)
    participant DB as Database

    Ext->>SF: POST /services/apexrest/OrderIntake/<br/>Authorization: Bearer token
    SF->>SF: Validate token, resolve running user
    SF->>SF: Enforce CRUD/FLS for that user
    SF->>DB: insert Order__c
    DB-->>SF: Success / DML exception
    SF-->>Ext: 201 Created {recordId, status}
```

## Common mistakes

- **Not validating input.** `JSON.deserializeUntyped` is permissive — check required
  fields exist and are the expected type before using them, and return a clear 4xx
  with a useful message when they aren't.
- **Returning 200 for everything, including failures.** Use real HTTP status codes
  (`201` created, `400` bad request, `404` not found, `500` unexpected error) so
  callers can handle outcomes programmatically instead of parsing text.
- **Forgetting `with sharing`.** Without it, your Apex REST class can run in a
  context that bypasses the calling user's record-level sharing rules.
- **Skipping CRUD/FLS checks.** `insert`/`update` still respect field-level security
  only if your code checks it (or you use patterns like `Security.stripInaccessible`);
  a `global without sharing` class with no checks can let an under-permissioned caller
  write data they shouldn't.
- **Designing a bespoke endpoint when the standard REST API already does the job.**
  Apex REST is for cases the standard API genuinely can't cover — custom validation,
  multi-object transactions, non-standard payload shapes — not a default.

## Learn more on Trailhead

[Apex Integration Services](https://trailhead.salesforce.com/content/learn/modules/apex_integration_services)
includes units on building and testing Apex web services.
