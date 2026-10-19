# Methods

This section explains the three numerical methods used in this project to find the root of a nonlinear equation: **Bisection**, **Newton–Raphson**, and **Secant**.  
Each method improves an initial guess step by step until the value of \( x \) becomes close enough to the actual root within a chosen tolerance.

---

## 1. Bisection Method

The **Bisection Method** is a simple and reliable way to find a root by dividing an interval in half repeatedly and choosing the part where the function changes sign.  
It is based on the **Intermediate Value Theorem**, which states that if \( f(a) \) and \( f(b) \) have opposite signs, then there is at least one root between them.

**Procedure:**

1. Choose two values \( a \) and \( b \) such that \( f(a) \times f(b) < 0 \).
2. Find the midpoint:

$$
x_{i+1} = \frac{a + b}{2}
$$

3. Check the sign of \( f(x_{i+1}) \):
   - If \( f(a) \times f(x_{i+1}) < 0 \), set \( b = x_{i+1} \).
   - Otherwise, set \( a = x_{i+1} \).
4. Continue until the interval \( |b - a| \) is smaller than the chosen tolerance \( \varepsilon \).

**Stopping Criterion:**

$$
|f(x_{i+1})| < \varepsilon
$$

**Advantages:**

- Always converges if \( f(a)f(b) < 0 \).
- Simple and easy to apply.

**Limitations:**

- Convergence is slow.
- Requires that the initial interval contains a sign change.

---

## 2. Newton–Raphson Method

The **Newton–Raphson Method** uses the tangent line at a point to find where the function crosses the x-axis.  
It requires the derivative \( f'(x) \) and a good initial guess \( x_0 \).

**Formula:**

$$
x_{i+1} = x_i - \frac{f(x_i)}{f'(x_i)}
$$

**Procedure:**

1. Choose a starting value \( x_0 \).
2. Use the formula to calculate a new value \( x_{i+1} \).
3. Repeat until \( |x_{i+1} - x_i| < \varepsilon \).

**Advantages:**

- Very fast (quadratic) convergence if the first guess is close to the root.
- Needs fewer iterations than other methods.

**Limitations:**

- Requires the derivative \( f'(x) \).
- May fail if \( f'(x_i) = 0 \) or if the first guess is not near the root.

---

## 3. Secant Method

The **Secant Method** is similar to Newton–Raphson but does not require a derivative.  
Instead, it estimates the slope using two recent points.

**Formula:**

$$
x_{i+1} = x_i - f(x_i) \frac{x_i - x_{i-1}}{f(x_i) - f(x_{i-1})}
$$

**Procedure:**

1. Choose two initial guesses \( x_0 \) and \( x_1 \).
2. Use the formula to find \( x_{i+1} \).
3. Repeat until \( |x_{i+1} - x_i| < \varepsilon \).

**Advantages:**

- Faster than Bisection and does not need the derivative.
- Easier to apply than Newton–Raphson.

**Limitations:**

- May fail if \( f(x_i) \) and \( f(x_{i-1}) \) are almost the same.
- Convergence is slower than Newton–Raphson.

---

## Summary of Methods

| **Method**         | **Requires Derivative** | **Convergence Speed** | **Reliability**            | **Notes**               |
| ------------------ | ----------------------- | --------------------- | -------------------------- | ----------------------- |
| **Bisection**      | No                      | Slow                  | Always convergent          | Simple and reliable     |
| **Newton–Raphson** | Yes                     | Fast                  | Depends on initial guess   | Needs \( f'(x) \)       |
| **Secant**         | No                      | Moderate              | Depends on initial guesses | Approximates derivative |
