# Finitio features

This folder contains cucumber features aiming at being used for

* Documenting Finitio and specific use cases,
* Testing Finitio bindings on a shared test suite,
* Proposing new features through pull-requests

## Testing

All cucumber features shared here are kept abstract enough to be reusable
across Finitio implementations. Implementors are kindly asked to report any
"non-portable" feature with a short explanation of why it is not portable
to their host language.

To achieve this, the test suite supposes a test system in Finitio that has the
semantics below. The actual Finitio definition of such a test system is host
dependent, of course. See
[Finitio-rb](https://github.com/blambeau/finitio-rb/blob/master/features/support/test-system.fio)
and 
[Finitio-js](https://github.com/llambeau/finitio.js/blob/master/features/support/test_system.coffee)
for definition examples. The 'test-system' folder of this test
suite contains features that test the accuracy of the test system definition
itself.

```
# All and Nothing
Any = The set of everything representable in the host language.
Nil = The singleton set containing nil, null, NULL or what looks like it.

# Booleans
True    = The singleton set containing the Boolean true
False   = The singleton set containing the Boolean false
Boolean = The set containing true and false

# Numerics
Numeric = All mathematical numbers
Real    = Mathematical reals 
Integer = Mathematical integers

# String
String  = The set of all character strings

# Dates and Time, required to support an iso8601 contract from String
Date    = The set of all valid dates, e.g. 2014-03-01
Time    = The set of all valie date-time, e.g. 2014-03-01T08:30
```
