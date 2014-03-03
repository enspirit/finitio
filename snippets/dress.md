```ruby
# RGB information contract
dress   :: {r: Byte, g:Byte, b: Byte} -> Color
undress :: Color -> {r: Byte, g:Byte, b: Byte}

# HEX information contract
dress   :: String( s | s =~ /#[a-f0-9]{6}/ ) -> Color
undress :: Color -> String( s | s =~ /#[a-f0-9]{6}/ )
```
