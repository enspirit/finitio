```ruby
JSNumber = String( s | s =~ ... )
Integer  = <json> JSNumber \( s | ... ) \( i | ... )
```

```ruby
dress   :: JSNumber -> Integer
undress :: Integer -> JSNumber
```
