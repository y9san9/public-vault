![[calkt_banner.jpg]]

> Kotlin library to calculate everything

![[inline_github_logo.png|13]] **Sources**: [y9san9/calkt](https://github.com/y9san9/calkt)
📊 **Status:** Stable
🚀 **Type**: [[Kotlin Libraries]]

Calkt is a Kotlin library that supports parsing and calculating various expressions. Parser is written in a way to have an ability to be extended.

## Example

```kotlin
val mathExpression = readln()
    // Parse expression
val parseResult = tryParse(mathExpression)

when (parseResult) {
	is ParseResult.Failure -> {
		System.err.println("Cannot parse expression:")
		System.err.print(parseResult.toConsoleOutput())
		exitProcess(0)
	}
	is ParseResult.Success -> {
		println("Parsed as: ${parseResult.value}")
	}
}

// Calculate expression
val expression = parseResult.value

val result = tryCalculate(expression)

when (result) {
	is MathCalculateSuccess -> println("Result: ${result.number}")
	is CalculateResult.DivisionByZero -> println("Result: Division By Zero")
}
```
