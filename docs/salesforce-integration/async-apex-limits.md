---
sidebar_position: 16
title: Async Apex and Governor Limits
description: Future methods, Queueable, Batch Apex, Scheduled Apex, and the governor limits that shape integration design.
---

import Quiz from '@site/src/components/Quiz';
import LessonComplete from '@site/src/components/LessonComplete';
import TopicIconBadge from '@site/src/components/TopicIcon/Badge';
import LessonDownloads from '@site/src/components/LessonDownloads';

<TopicIconBadge id="async-apex-limits" />

# Async Apex and Governor Limits

Integrations are one of the main reasons Salesforce has asynchronous Apex at all:
callouts, large data volumes, and chained processing all need to happen *outside* the
tight, limited window of a normal synchronous transaction.

## The four flavors

| Type | Good for | Key constraint |
|---|---|---|
| **`@future` methods** | Simple fire-and-forget async work, including callouts (`@future(callout=true)`) | No return value, can't easily chain, limited parameter types (primitives/collections of primitives) |
| **Queueable Apex** | Async work that needs complex parameters (sObjects, custom types) or needs to chain into another job | Chaining depth and queue depth have their own limits |
| **Batch Apex** | Processing large record sets (thousands to millions) in chunks | Runs in separate transactions per batch/scope; higher overhead per job |
| **Scheduled Apex** | Running something on a recurring schedule (e.g. nightly sync) | Typically kicks off a Batch or Queueable job rather than doing heavy work itself |

```mermaid
flowchart TD
    Trigger[Trigger / UI action] -->|simple, fire-and-forget| Future["@future method"]
    Trigger -->|needs chaining or complex params| Queueable[Queueable Apex]
    Scheduler[Scheduled Apex<br/>cron-like trigger] --> Batch[Batch Apex<br/>processes in scopes]
    Queueable -->|can enqueue another job| Queueable
    Batch -->|execute() per chunk| Chunk1[Scope 1]
    Batch --> Chunk2[Scope 2]
    Batch --> Chunk3[Scope N]
```

## A Queueable callout example

```apex
public class SyncOrderJob implements Queueable, Database.AllowsCallouts {
    private Id orderId;

    public SyncOrderJob(Id orderId) {
        this.orderId = orderId;
    }

    public void execute(QueueableContext context) {
        Order__c order = [SELECT Id, Amount__c FROM Order__c WHERE Id = :orderId];

        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Billing_API/orders');
        req.setMethod('POST');
        req.setBody(JSON.serialize(order));

        HttpResponse res = new Http().send(req);
        if (res.getStatusCode() >= 500) {
            // Transient failure — re-enqueue with a retry counter in a real
            // implementation, rather than retrying unconditionally forever.
        }
    }
}

// Kick it off from a trigger (after the triggering transaction's DML):
System.enqueueJob(new SyncOrderJob(order.Id));
```

## Governor limits that matter most for integration

- **Callouts per transaction:** 100 maximum, 120 seconds combined timeout.
- **Future method calls per transaction:** 50.
- **Queueable jobs added per transaction:** 50 (1 if chained from another Queueable's
  `execute()`, to prevent runaway chains).
- **Batch Apex scope size:** up to 2,000 records per `execute()` call, configurable
  smaller if each record needs a callout (since callout limits apply *per
  transaction*, i.e. per batch scope).
- **Heap size, CPU time, SOQL queries:** all async contexts get their own fresh limits
  per transaction/scope — they don't share a budget with the transaction that started
  them, but each new context has its own ceiling to respect.

## Common mistakes

- **Making a callout per record inside a Batch Apex scope of 2,000.** That instantly
  exceeds the 100-callouts-per-transaction limit. Keep batch scope size small enough
  (e.g. 50–100) when each record needs its own callout.
- **Chaining Queueable jobs indefinitely.** Each job can enqueue only one more in most
  orgs — useful for a bounded pipeline, dangerous if used to build an unbounded loop.
- **Using `@future` when you need the job's result or need to chain further work.**
  Future methods are fire-and-forget by design; reach for Queueable when you need more
  control.
- **Not planning for monitoring.** Async jobs fail silently from the end user's point
  of view — pair them with logging (e.g. a custom log object) or the Apex Jobs page,
  not just a `try/catch` that swallows errors.

## Learn more on Trailhead

[Asynchronous Apex](https://trailhead.salesforce.com/content/learn/modules/asynchronous_apex)
covers future methods, Batch Apex, Queueable Apex, and Scheduled Apex with examples.

<LessonDownloads topicId="async-apex-limits" />

## Quiz

<Quiz quizId="async-apex-limits" />

<LessonComplete topicId="async-apex-limits" />
