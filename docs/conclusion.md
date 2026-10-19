# Conclusion

This project used three numerical methods — **Bisection**, **Newton–Raphson**, and **Secant** — to find the root of nonlinear equations that cannot be solved exactly.  
Each method was tested and compared to study how fast and accurately it converges to the correct solution.

---

## 6.1 Summary of Findings

- All three methods found the same root for \( f(x) = x^2 - 4 \), which is **x = 2**.
- The **Bisection Method** was the most reliable since it always converges when the function changes sign in the interval.
- The **Newton–Raphson Method** was the fastest, reaching the correct answer in the fewest steps.
- The **Secant Method** gave accurate results without needing the derivative and was faster than Bisection.

These results agree with what was expected from the course material and slides — Newton–Raphson has the highest speed, while Bisection guarantees convergence.

---

## 6.2 Reflection

Through this project, we learned how:

- Iterative methods gradually move closer to the root.
- Each method has different trade-offs between **speed**, **accuracy**, and **stability**.
- The choice of initial guess and tolerance affects how well the method performs.

By using **GNU Octave**, we were able to apply the mathematical theory directly through coding.  
This helped connect what was learned in class with practical problem-solving using software tools.

---

## 6.3 Future Work

To improve this project in the future, we could:

- Add **graphical visualizations** to show how the root changes with each iteration.
- Apply the methods to **different functions** or **systems of equations**.
- Compare these methods with other techniques like **Fixed-Point Iteration** or **Hybrid Methods** to study more complex cases.

---

## 6.4 Final Thoughts

This project shows how numerical methods are powerful tools in **mathematics and engineering**.  
Even when a problem has no exact solution, these techniques allow us to find accurate approximations.  
Among the three methods, **Newton–Raphson** proved to be the fastest, but **Bisection** remains the most dependable when accuracy and guaranteed convergence are needed.
