# Frequently Viewed Product

let's say there is a product a user is viewing

`onView -> /api/product/viewed -> count++`

- putting these in a single table
- maintain 50 products at a time
- reset count by max value (i.e., max - all product counts)

show this list of products

## Maintaining 50 products at a time

### Approach 1

`GET /api/product/123/viewed`

```
entries = db.get_count()
if entries >= 100:
  product = db.get_lowest_count_entry()
  if product.id != 123
    db.delete(product)
db.create_or_update({123: count++})
```

but this approach has a flaw

say,

```
GET /api/product/321/viewed
count = 99
ADDED 321   // 321 -> 1
---
GET /api/product/123/viewed
count == 100
DELETED 321
ADDED 123   // 123 -> 1
---
GET /api/product/123/viewed
count == 100
UPDATED 123   // 123 -> 2
---
GET /api/product/321/viewed
count = 100
DELETED 123
ADDED 321   // 321 -> 1
```

when `count == 100` the last added product won't be able to rise up the ladder

### Approach 2

Instead of 50 products let's maintain 100 products.
we'll show 50 products
and when `count == 100`, delete last 50

so, products below 50 are safe, and products above 50 will be unsafe and will have enough room to cross 50 bar.

```bash
GET /api/product/321/viewed
count = 99
ADDED 321   // 321 -> 1
---
GET /api/product/123/viewed
count == 100
DELETED [51 - 100]
DELETED 51: 432 -> 5  // 50: 453 -> 5
DELETED 99: 321 -> 1
ADDED 123   // 51: 123 -> 1
---
GET /api/product/432/viewed
count = 51
ADDED 432   // 52: 432 -> 1
```

> `432` could have been at 50 but `123` ruined it

a different problem (kind of similar emerges here)

### Approach 3

focus on the work `Frequently` - this changes everything

gives us one more parameter to evict an entry - time

but time is just a sometimes thing, it won't be there always

btw, this is a solved thing - one of the cache strategy has to be used here.
LFU - that gives us which product to evict

Only if you've studied cache strategies.

Let's try to remember. Not working.

Let's read an article.

That was simple

but that's exactly what i implemented. But still doesn't answer my case.

LFU says,

```
ADD A
// when cache is full
REMOVE with lowest count
// add new entry
DELETE A  // lowest frequency
ADD B
// A is gone
// say we need to access A now, B will be gone and so on...
```

so in these cases of alternate access we need to sort of build a strategy.

Do we though? or LFU handles this already?

Time to ask AI!

Thankgod I asked AI. I was so on the wrong path. Got to know about time decay strategy

### For Most Viewed Historically

#### Correct Approach 1

- Simple counter in products table
- fetch top 50 based on the count

#### Correct Approach 1

use redis sorted set

### For Frequently viewed recently

This is most commonly used and maybe this is what I was looking for.

So we set how much recent products we want. Say a week

eviction policy: remove products more than a week(sort of like api rate limiting)
can use sliding window

`[{123, count, time}]`

```
before adding new product check for products with time more and week and remove them
add or update count
```

now does this solve our previous problem

Since, here we do not have an upper bound, so may be maintaining any `n` number of products

but say, (this is such a stupid case, but) everyone viewed only one product for a week. We'll show them just that one product

so for this we, can maintain multiple arrays of products, say of a month, and week and day.

we'll show month's frequent (but this will be sliding window, as for next month there won't be anything), week's will be pushed in months and day's will be in week

and thus we'll have more products to show.

but how can we not have an upper bound? like what if we have extreme n products viewed some week, that's gonna hurt our system real bad. so let's put a bound

We can!

we don't need to take all those extreme n products, we can simply take - but wait, we're storing them! that's a problem

but again, while storing, we're in same problem.

how do we decide what to remove, and if we do, is that right strategy?

## The Actual Problem

We can't just do it via count. There's alot more to this.

Yes, we can use redis set but again, it will be unbounded and can cause us problems

i.e., unbounded cardinality

So, how do we fix this, we need something that

- frequency must decay with time
- storage must be bounded

## Solution

Hence we use something known as heavy hitter algorithms

- Top-K
- Heavy hitters algorithm

Now, we have got something new to study

- Misra-gries
- Space saving
- count-min sketch
- lossy counting
