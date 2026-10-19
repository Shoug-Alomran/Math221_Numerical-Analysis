# Comparison of Methods

This section compares the three numerical methods used in this project — **Bisection**, **Newton–Raphson**, and **Secant** — based on how they find the root, their rate of convergence, and overall behavior.  
Although all three methods aim to solve \( f(x) = 0 \), they differ in how the next value \( x_{i+1} \) is calculated from previous iterations.

---

## 5.1 Bisection Method

- The **Bisection Method** starts with two values \( a \) and \( b \) such that \( f(a) \times f(b) < 0 \).
- The midpoint is found by:
  $$
  x_{i+1} = \frac{a + b}{2}
  $$
- The new interval is then selected based on the sign of \( f(x_{i+1}) \).
- This process repeats until the difference between \( a \) and \( b \) becomes very small.

**Main Points:**

- Converges **slowly but always works** if \( f(a)f(b) < 0 \).
- Does **not need derivatives**.
- Each step cuts the interval in half.

---

## 5.2 Newton–Raphson Method

- The **Newton–Raphson Method** uses the tangent line to find where the function crosses the x-axis.
- Starting from an initial guess \( x_0 \), it applies the formula:
  $$
  x_{i+1} = x_i - \frac{f(x_i)}{f'(x_i)}
  $$
- The next value \( x_{i+1} \) is where the tangent line at \( (x_i, f(x_i)) \) meets the x-axis.

**Main Points:**

- **Very fast** convergence if the first guess is close to the actual root.
- Needs the **first derivative** \( f'(x) \).
- Might **diverge** if \( f'(x_i) = 0 \) or if the first guess is poor.

---

## 5.3 Secant Method

- The **Secant Method** is similar to Newton–Raphson but uses two previous points instead of a derivative.
- The formula is:
  $$
  x_{i+1} = x_i - f(x_i) \frac{x_i - x_{i-1}}{f(x_i) - f(x_{i-1})}
  $$
- It uses the slope of the secant line between \( (x_{i-1}, f(x_{i-1})) \) and \( (x_i, f(x_i)) \).

**Main Points:**

- **Faster** than Bisection but a bit **slower** than Newton–Raphson.
- **No derivative** is required.
- Can fail if \( f(x_i) \) and \( f(x_{i-1}) \) are nearly the same.

---

## 5.4 Summary of Comparison

| **Feature**             | **Bisection**                   | **Newton–Raphson**                           | **Secant**                                                             |
| ----------------------- | ------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------- |
| **Derivative Required** | No                              | Yes                                          | No                                                                     |
| **Initial Guesses**     | Two points \( a, b \)           | One point \( x_0 \)                          | Two points \( x_0, x_1 \)                                              |
| **Formula**             | \( x_{i+1} = \frac{a + b}{2} \) | \( x_{i+1} = x_i - \frac{f(x_i)}{f'(x_i)} \) | \( x_{i+1} = x_i - f(x_i) \frac{x_i - x_{i-1}}{f(x_i) - f(x_{i-1})} \) |
| **Convergence Speed**   | Slow                            | Fast                                         | Moderate                                                               |
| **Stability**           | Always convergent               | May diverge                                  | May diverge                                                            |
| **Ease of Use**         | Very Easy                       | Moderate                                     | Easy                                                                   |

---

## 5.5 Final Remarks

- The **Bisection Method** is the safest and always converges but is the slowest.
- The **Newton–Raphson Method** is the fastest and most accurate if the derivative is available.
- The **Secant Method** provides a balance — it is faster than Bisection and simpler than Newton–Raphson.

Overall, the **Newton–Raphson method** performed best in this project because it reached the correct root in fewer iterations, while all three methods produced the same final result (**x = 2**).
