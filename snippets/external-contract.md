```ruby
Color = .Color <rgb> {r: Byte, g: Byte, b: Byte} .RgbContract
```

```ruby
module RgbContract

  def self.dress(tuple)
    Color.new(tuple[:r], tuple[:g], tuple[:b])
  end

  def self.undress(color)
    { r: color.r, g: color.g, b: color.b }
  end

end
```