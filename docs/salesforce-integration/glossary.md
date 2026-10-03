---
sidebar_position: 8
title: Glossary
description: Plain, one-line definitions for the integration terms used throughout this course.
---

import TopicIconBadge from '@site/src/components/TopicIcon/Badge';
import LessonDownloads from '@site/src/components/LessonDownloads';

<TopicIconBadge id="glossary" />

# Glossary

Quick, plain-language definitions for terms used throughout this course. Where a term
has its own lesson, the entry links to it.

- **Access token** — a short-lived credential sent with each API call to prove who's
  calling; see [Authentication Basics](./authentication-basics.md).
- **API (Application Programming Interface)** — a defined way for one piece of
  software to talk to another.
- **Asynchronous** — the caller doesn't wait for the work to finish before moving on;
  see [Inbound vs Outbound Integration](./inbound-vs-outbound.md).
- **Base64** — a way of encoding binary or text data as plain ASCII text, commonly
  used to encode Basic authentication credentials.
- **Bearer token** — a token sent in the `Authorization` header that grants access to
  whoever "bears" (holds) it; see [Authentication Basics](./authentication-basics.md).
- **Bulk API** — Salesforce's API designed for loading or exporting very large record
  volumes asynchronously, instead of one record at a time.
- **Callout** — Salesforce's term for an outbound HTTP request made from Apex or Flow.
- **Change Data Capture (CDC)** — a Salesforce feature that publishes an event
  whenever a record is created, updated, deleted, or undeleted, for other systems to
  subscribe to.
- **CometD** — a server-push messaging technology; see
  [Terms You Will Meet](./integration-terms.md).
- **CSV (Comma-Separated Values)** — a simple, flat text format for tabular data,
  commonly used for bulk file-based integration.
- **Data mapping** — the work of matching fields from one system's data shape to
  another's (e.g. the external system's `cust_id` maps to Salesforce's `Account.Id`).
- **Endpoint** — the specific URL a request is sent to.
- **ETL (Extract, Transform, Load)** — the classic pattern of pulling data out of a
  source system, reshaping it, and loading it into a target system, usually in batch.
- **External Credential** — the newer Salesforce model that separates *how* to
  authenticate (protocol, tokens) from *where* to send the request; see
  [Authentication](./authentication.md).
- **GraphQL** — a query language letting clients request exactly the fields they
  need in one call; see [Terms You Will Meet](./integration-terms.md).
- **gRPC** — a high-performance binary RPC framework built on HTTP/2; see
  [Terms You Will Meet](./integration-terms.md).
- **Governor limit** — a strict, enforced ceiling on resource usage (callouts,
  queries, etc.) per transaction, to keep Salesforce's shared infrastructure fair for
  every org; see
  [Why Salesforce Is Different for Integrators](./why-salesforce-is-different.md).
- **Header** — metadata attached to a request or response, separate from the body
  (e.g. `Content-Type`, `Authorization`).
- **HTTPS / TLS** — HTTP carried over an encrypted connection (Transport Layer
  Security), so data in transit can't be read or tampered with by a third party.
- **Idempotent** — an operation that produces the same result no matter how many
  times you repeat it with the same input (e.g. "set status to Closed" is idempotent;
  "increment count by 1" is not).
- **iPaaS (Integration Platform as a Service)** — a hosted platform (e.g. MuleSoft,
  Workato) for building and running integrations without managing your own
  middleware infrastructure.
- **JSON (JavaScript Object Notation)** — a lightweight, text-based data format built
  from objects, arrays, and primitive values; see
  [JSON and XML Basics](./json-xml-basics.md).
- **Message queue** — a system (e.g. RabbitMQ, Amazon SQS) that holds messages for a
  receiver to process independently, decoupling sender and receiver in time.
- **Middleware** — software that sits between two or more systems, handling
  translation, routing, or orchestration of data between them.
- **Named Credential** — the Salesforce feature that stores an endpoint (and often
  authentication) so Apex/Flow never hardcode secrets directly; see
  [Authentication Basics](./authentication-basics.md).
- **OAuth** — the standard protocol for granting an application access on a user's or
  system's behalf without sharing a password; see
  [Authentication Basics](./authentication-basics.md).
- **OData (Open Data Protocol)** — a standard for exposing and querying data over
  HTTP with consistent filtering/sorting/paging; see
  [Terms You Will Meet](./integration-terms.md).
- **OpenAPI** — a standard, machine-readable way of describing a REST API's
  operations, inputs, and outputs (formerly known as Swagger).
- **Path parameter** — part of a URL's structure that identifies a specific resource,
  e.g. the `1` in `/todos/1`; see
  [Anatomy of a Request and Response](./request-response-anatomy.md).
- **Payload** — the actual data being sent in a request or response body.
- **Platform Event** — a Salesforce event object that other systems (or Salesforce
  automation) can subscribe to and react to in near real time.
- **Polling** — repeatedly asking "has anything changed?" on a timer, instead of
  being notified when something actually happens.
- **Pub/Sub API** — Salesforce's event-streaming API (built on gRPC) for publishing
  and subscribing to Platform Events and Change Data Capture.
- **Query parameter** — a key/value pair appended to a URL after `?`, typically used
  to filter or page results, e.g. `?userId=1`; see
  [Anatomy of a Request and Response](./request-response-anatomy.md).
- **Rate limit** — a cap on how many requests can be made in a given time window.
- **REST (Representational State Transfer)** — an architectural style where each
  resource has a URL and you act on it with HTTP methods; see
  [HTTP, REST and SOAP: Protocols Explained](./protocols-explained.md).
- **Retry** — automatically re-attempting a failed request, usually after a delay,
  ideally only for errors that might succeed on a second try.
- **SFTP (SSH File Transfer Protocol)** — a secure protocol for transferring files
  between systems, commonly used for scheduled batch integration.
- **SOAP (Simple Object Access Protocol)** — a stricter, XML-based protocol with a
  formal WSDL contract; see
  [HTTP, REST and SOAP: Protocols Explained](./protocols-explained.md).
- **Status code** — the three-digit number in an HTTP response indicating the
  outcome (e.g. `200`, `404`); see
  [HTTP, REST and SOAP: Protocols Explained](./protocols-explained.md).
- **Synchronous** — the caller waits for the work to finish before moving on; see
  [Inbound vs Outbound Integration](./inbound-vs-outbound.md).
- **System of record** — the single source of truth for a given piece of data, when
  the same data might exist in more than one system.
- **Timeout** — how long a caller waits for a response before giving up.
- **Token** — a piece of data representing proof of identity or permission, used
  instead of sending raw credentials on every call.
- **Webhook** — a callback where another system calls you the instant something
  happens, instead of you polling for it; see
  [Terms You Will Meet](./integration-terms.md).
- **WSDL (Web Services Description Language)** — an XML document describing a SOAP
  service's available operations and data shapes.
- **XML (eXtensible Markup Language)** — a tag-based, nestable data format; see
  [JSON and XML Basics](./json-xml-basics.md).

<LessonDownloads topicId="glossary" />
