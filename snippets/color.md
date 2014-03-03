```ruby
class Color

  def initialize(r, g, b)
    @r, @g, @b = r, g, b
  end
  attr_reader :r, :g, :b

  def self.rgb(tuple)
    Color.new(tuple[:r], tuple[:g], tuple[:b])
  end

  def to_rgb
    {r: @r, g: @g, b: @b}
  end

end
```