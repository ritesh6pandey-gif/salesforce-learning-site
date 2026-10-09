---
sidebar_position: 8
title: Terms You Will Meet
description: Plain explanations of webhook, OData, GraphQL, gRPC, CometD, file/queue-based integration, and OAuth.
---

import Quiz from '@site/src/components/Quiz';
import LessonComplete from '@site/src/components/LessonComplete';
import TopicIconBadge from '@site/src/components/TopicIcon/Badge';
import LessonDownloads from '@site/src/components/LessonDownloads';

<TopicIconBadge id="integration-terms" />

# Terms You Will Meet

Integration conversations are full of terms that get dropped without explanation,
on the assumption everyone already knows them. Here's a plain-language introduction
to the ones you'll run into most, before you need them in depth.

## Webhook

A **webhook** is a callback: instead of your system repeatedly *asking* "has
anything changed yet?", the other system calls *you* the moment something happens.
Real-world use: a payment gateway calling your endpoint the instant a payment clears,
instead of you polling its API every few seconds hoping to catch the update.
**In Salesforce:** an inbound webhook is typically received by a custom Apex REST
endpoint you expose for the sender to call.

## OData

**OData** (Open Data Protocol) is a standard way of exposing and querying data over
HTTP, with a consistent structure for filtering, sorting, and paging results across
different systems. Real-world use: an enterprise data platform exposes its tables
through a single OData endpoint that many different client tools can query the same
way. **In Salesforce:** OData is one of the adapter types behind
[Salesforce Connect](./salesforce-connect.md), letting Salesforce treat external
OData-exposed data as if it were a native object.

## GraphQL

**GraphQL** is a query language that lets the *client* specify exactly which fields
it wants back, in a single request — instead of calling multiple fixed REST
endpoints and getting back more data than you need. Real-world use: a mobile app
fetches a user's name, their last three orders, and nothing else, in one round trip.
**In Salesforce:** exposed through the **GraphQL API**, which lets clients query
multiple objects and relationships in a single request.

## gRPC

**gRPC** is a high-performance, binary RPC (remote procedure call) framework built on
HTTP/2, often used where speed and streaming matter more than human-readability.
Real-world use: two backend microservices inside the same company exchanging a high
volume of calls with minimal overhead. **In Salesforce:** gRPC is the transport
underneath the **Pub/Sub API**, which streams Platform Events and Change Data Capture
events to subscribers.

## CometD

**CometD** is an implementation of the Bayeux protocol for server-push messaging over
HTTP — a way for a server to push updates to a client without the client repeatedly
asking. Real-world use: a web dashboard that updates live as new data arrives, without
refreshing the page. **In Salesforce:** CometD is the technology behind the
(older) Streaming API's client-side subscriptions, conceptually similar to what
Pub/Sub API now handles for events.

## File and queue based integration

Not every integration is a live API call. **SFTP** (SSH File Transfer Protocol) moves
files — typically scheduled batch exports/imports like a nightly CSV — between
systems without either side needing to expose a live API. **Message queues** (like
RabbitMQ or Amazon SQS) let one system drop a message for another to pick up and
process independently, decoupling the sender from needing the receiver to be online
at that exact moment. Real-world use: a nightly SFTP drop of yesterday's completed
orders for a finance system to import on its own schedule.

## OAuth

**OAuth** is the standard way an application gets permission to act on a user's or
system's behalf, without ever handling that user's password directly — covered in
depth in [Authentication Basics](./authentication-basics.md). Real-world use: logging
into a third-party app "with Google" without ever typing your Google password into
that third-party app.

## Common mistakes

- **Treating a webhook and polling as interchangeable.** They solve the same problem
  differently — polling wastes calls checking "anything new?", a webhook only fires
  when there's actually something to report.
- **Assuming GraphQL replaces REST entirely.** They coexist — GraphQL is a good fit
  when clients need flexible, shaped queries; REST remains simpler for straightforward
  CRUD.
- **Forgetting that file-based integration still needs error handling.** A failed
  SFTP transfer or a malformed CSV needs the same attention as a failed API call —
  "it's just a file drop" doesn't mean it can't silently fail.

<LessonDownloads topicId="integration-terms" />

## Quiz

<Quiz quizId="integration-terms" />

<LessonComplete topicId="integration-terms" />
