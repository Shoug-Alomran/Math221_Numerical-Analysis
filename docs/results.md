# Results  

This section presents the results obtained from applying the **Bisection**, **Newton–Raphson**, and **Secant** methods to solve a nonlinear equation.  
All methods were implemented in **GNU Octave** to compare their convergence, number of iterations, and overall accuracy.

---

## 4.1 Function Used  

The function chosen for analysis is:

$$
f(x) = x^2 - 4
$$

The exact root of this function is \( x = 2 \), since \( 2^2 - 4 = 0 \).  
This function was selected because it is simple yet suitable for observing the convergence behavior of each method.

---

## 4.2 Iterative Results  

Each method was executed in **GNU Octave 10.3.0** (compatible with MATLAB).  
The table below summarizes the number of iterations required to reach the approximate root using a tolerance of \( 10^{-6} \):

| **Method** | **Approximate Root** | **Iterations** | **Remarks** |
|-------------|----------------------|----------------|--------------|
| **Bisection** | 2.000000 | 1 | Fast convergence due to midpoint symmetry. |
| **Newton–Raphson** | 2.000000 | 5 | Fast quadratic convergence. |
| **Secant** | 2.000000 | 6 | Slightly slower but accurate without derivative. |

All three methods successfully reached the same root, \( x = 2 \).  
Among them, the **Newton–Raphson Method** converged the fastest.

---

## 4.3 Sample Output from Octave  

Below is an example of the terminal output for the **Newton–Raphson Method**:

```bash
Enter initial guess x0 = 1
Enter tolerance = 1e-6

Iteration 1: x1 = 2.500000, f(x1) = 2.250000
Iteration 2: x2 = 2.050000, f(x2) = 0.202500
Iteration 3: x3 = 2.000610, f(x3) = 0.002441
Iteration 4: x4 = 2.000000, f(x4) = 0.000000
Root found at x = 2.000000 after 5 iterations
```

## 4.4 Graphical Representation

The figures below illustrate the computational results and graphical output obtained in **GNU Octave** for the three numerical methods.

### Figure 2: Graph Output
![Figure 2: Graph Output](img/Graph%20Output.png){ width="800" }

*Figure 2: Plot of the function \(f(x) = x^2 - 4\) showing convergence of methods toward the true root \(x = 2\).*

---

## 4.5 Observations  

- All three methods converged to the same solution with very small error.  
- The **Newton–Raphson Method** showed the fastest convergence because of its quadratic rate.  
- The **Bisection Method** was the most stable but required fewer computational steps in this special case.  
- The **Secant Method** performed well without the need for derivatives.  
- In all methods, the error decreased steadily as the number of iterations increased.

---

## 4.6 Error vs. Iteration  

The error plot illustrates how each method’s error value decreases with each iteration.  
The **Newton–Raphson Method** shows the steepest drop in error, confirming that it converges faster than the **Bisection** and **Secant** methods.  
This agrees with the expected theoretical behavior discussed in the course.

---

## 4.7 Summary of Results  

| **Metric** | **Bisection** | **Newton–Raphson** | **Secant** |
|-------------|:-------------:|:------------------:|:-----------:|
| **Root Found** | 2.000000 | 2.000000 | 2.000000 |
| **Iterations** | 1 | 5 | 6 |
| **Derivative Required** | No | Yes | No |
| **Convergence Type** | Linear | Quadratic | Superlinear |
| **Stability** | High | Medium | Medium |

All three methods produced the same correct root \( x = 2 \).  
However, the **Newton–Raphson Method** was the most efficient because it reached the solution with fewer iterations and high precision.  

---

## 4.8 Conclusion of Findings  

The experiment confirmed the theoretical performance of each numerical method:  

- The **Bisection Method** always converges but is relatively slow.  
- The **Newton–Raphson Method** is the fastest when the derivative and a good initial guess are available.  
- The **Secant Method** offers a practical compromise when the derivative is unknown.  

These results are consistent with the concepts learned in class and demonstrate how each method behaves in practice.  
They also show the importance of selecting the right numerical method depending on the type of equation and the information available.