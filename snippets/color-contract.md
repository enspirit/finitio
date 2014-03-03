```ruby
Color = .Color <rgb> {r: Byte, g: Byte, b: Byte}
                     \( tuple | Color.new(tuple.r, tuple.g, tuple.b) )
                     \( color | {r: color.r, g: color.g, b: color.b} )
```