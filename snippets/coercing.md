```json
[
  {
    "where": "Brussels",
    "at": "2014-03-01",
    "temperature": 13.5
  },
  {
    "where": "Paris",
    "at": "2014-02-27",
    "temperature": 12.0
  }
]
```

```ruby
Measure = .Measure <info> {
  where: String,
  at: Date,
  temperature: Float( f | f >= -40.0 and f <= 50.0 )
}
[Measure]
```

```ruby
[
 #<Measure:0x007fb5d3a1ba40 @where="Brussels", @at=#<Date: 2014-03-01>, @temperature=13.5>,
 #<Measure:0x007fb5d3a16450 @where="Paris", @at=#<Date: 2014-02-27>, @temperature=12.0>
]
```
