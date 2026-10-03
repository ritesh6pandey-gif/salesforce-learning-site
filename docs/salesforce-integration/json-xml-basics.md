---
sidebar_position: 4
title: JSON and XML Basics
description: Reading nested JSON and XML, and how Apex wrapper classes map JSON keys onto fields.
---

import Quiz from '@site/src/components/Quiz';
import LessonComplete from '@site/src/components/LessonComplete';
import TopicIconBadge from '@site/src/components/TopicIcon/Badge';
import LessonDownloads from '@site/src/components/LessonDownloads';

<TopicIconBadge id="json-xml-basics" />

# JSON and XML Basics

Almost every integration eventually comes down to reading or writing one of two data
formats: **JSON** or **XML**. You don't need to be an expert in either — you need to
be able to read a real, nested example without getting lost.

## JSON building blocks

JSON has exactly six kinds of value:

- **Object** — a set of key/value pairs, wrapped in `{ }`.
- **Array** — an ordered list, wrapped in `[ ]`.
- **String** — text, in double quotes.
- **Number** — no quotes, can be an integer or decimal.
- **Boolean** — `true` or `false`.
- **Null** — `null`, meaning "no value."

Objects and arrays can **nest** inside each other, which is where JSON starts to look
intimidating. Reading it step by step:

```json
{
  "id": 1,
  "title": "delectus aut autem",
  "completed": false,
  "user": {
    "id": 1,
    "name": "Leanne Graham",
    "address": {
      "city": "Gwenborough",
      "zipcode": "92998-3874"
    }
  },
  "tags": ["urgent", "personal"]
}
```

Reading this top-down: it's one **object** with five keys. `id`, `title`, and
`completed` are plain values. `user` is itself an **object**, and *its* `address`
field is another nested object inside that. `tags` is an **array** of two strings.
There's no limit to how deep this nesting can go — the trick is reading one level at
a time instead of trying to take in the whole thing at once.

## XML building blocks

XML structures data with **elements** (tags) that can carry **attributes** and nest
inside each other:

```xml
<todo id="1" completed="false">
  <title>delectus aut autem</title>
</todo>
```

Here, `<todo>` is an element with two **attributes** (`id`, `completed`) and one
nested **element** (`<title>`), whose content is the text between its tags.

At an introductory level, you'll also see **namespaces** — a way to avoid naming
collisions when XML from different sources gets combined, usually declared with
`xmlns`. A simplified SOAP envelope shows this in a real-world case:

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetTodoResponse>
      <Title>delectus aut autem</Title>
      <Completed>false</Completed>
    </GetTodoResponse>
  </soap:Body>
</soap:Envelope>
```

`soap:Envelope` and `soap:Body` belong to the `soap` namespace (defined by the
`xmlns:soap` attribute), which keeps them distinct from any other `Envelope` or
`Body` element that might appear elsewhere in a larger document.

## The same data, side by side

| | JSON | XML |
|---|---|---|
| Same todo | `{"id": 1, "title": "...", "completed": false}` | `<todo id="1" completed="false"><title>...</title></todo>` |
| Readability | Compact, close to how developers think in objects | More verbose, but self-describing with named tags |
| Typical use today | Most new REST APIs | SOAP services, legacy enterprise systems, document-style data |

## Salesforce connection: parsing JSON into a wrapper class

Apex gives you two main ways to turn a JSON string into something usable:

- **`JSON.deserializeUntyped(jsonString)`** — turns JSON into generic `Map`/`List`
  structures. Flexible, but you lose compile-time type safety and have to cast
  everything yourself.
- **`JSON.deserialize(jsonString, MyClass.class)`** — turns JSON straight into an
  instance of your own Apex class (a "wrapper class"), matching JSON keys to class
  field names.

A short example parsing a todo response into a class:

```apex
public class TodoWrapper {
    public Integer id;
    public String title;
    public Boolean completed;
}

String jsonBody = '{"id":1,"title":"delectus aut autem","completed":false}';
TodoWrapper todo = (TodoWrapper) JSON.deserialize(jsonBody, TodoWrapper.class);

System.debug(todo.title); // delectus aut autem
```

The field names in `TodoWrapper` have to **match the JSON keys** for this to work
automatically — `id` maps to `id`, `title` maps to `title`, and so on.

## Common mistakes

- **Key name mismatches.** If the JSON key is `userId` but your Apex field is
  `userID` or `user_id`, `deserialize` won't populate it — Apex field names must match
  the JSON keys exactly (case-sensitively).
- **Reserved words as JSON keys.** A JSON key like `type` or `status` might collide
  with words Apex treats specially in other contexts — rename the Apex field if needed
  and remember the JSON key itself doesn't have to match 1:1 if you're using
  `deserializeUntyped` and mapping manually instead.
- **Assuming a field always exists.** Real-world APIs often omit a key entirely when
  it has no value, rather than sending `null` — check for `null` after deserializing
  before using a field, don't assume it's always populated.
- **Mixing up numbers and strings.** `"id": 1` and `"id": "1"` are different JSON
  types, and deserializing the wrong one into an `Integer` field will throw — some
  APIs are inconsistent about this between endpoints.

<LessonDownloads topicId="json-xml-basics" />

## Quiz

<Quiz quizId="json-xml-basics" />

<LessonComplete topicId="json-xml-basics" />
