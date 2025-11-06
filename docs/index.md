# Math 221 — Numerical Analysis Project  

### Prince Sultan University  
**Course:** Math 221 — Numerical Analysis  
**Instructor:** Dr. Nahid Fatima  
**Submission Date:** 16 November 2025  

---

## Developed by  
| Name | Student ID | Role |
|------|-------------|------|
| **Shoug Fawaz Alomran** | 223410392 | Implementation, documentation, and digital report development |
| **Shahad Abunayan** | 223410189 | Mathematical handwritten derivations and theoretical explanation |
| **Manar Altuwaim** | 220410529 | Handwritten calculations and verification of numerical results |

*Collaboration Note:*  
This project was completed collaboratively. **Shoug Alomran** led the implementation, documentation, and site publishing, while **Shahad Abunayan** and **Manar Altuwaim** contributed to the **mathematical handwritten derivations, theoretical analysis, and manual calculations** of all numerical methods.

---

## Project Title
**Comparison of Numerical Methods for Solving Nonlinear Equations**  
*(Bisection, Newton–Raphson, and Secant Methods)*  

---

## Abstract
This project explores three fundamental numerical techniques — **Bisection**, **Newton–Raphson**, and **Secant** — for approximating the roots of nonlinear equations that cannot be solved analytically.  

Each method was implemented using **GNU Octave**, and the results were analyzed to compare convergence rate, accuracy, and stability.  
All three methods converged to the same correct root, but the **Newton–Raphson Method** demonstrated the fastest convergence, followed by **Secant**, while **Bisection** remained the most reliable though slower.  

---

## Objectives
1. Implement and compare classical numerical root-finding methods.  
2. Evaluate their convergence rate, accuracy, and computational efficiency.  
3. Visualize results through graphs and iterative tables.  
4. Reinforce theoretical understanding through handwritten derivations.  

---

## Methods Used
| Method | Description | Characteristics |
|--------|--------------|----------------|
| **Bisection Method** | Repeatedly divides the interval to locate the root. | Slow but guaranteed convergence. |
| **Newton–Raphson Method** | Uses tangent-line approximations based on derivatives. | Fast but requires an accurate initial guess. |
| **Secant Method** | Approximates derivatives numerically using two initial points. | Moderate speed and simplicity. |

---

## Results Summary

| Method | Approximate Root | Converged in Iterations |
|--------|------------------|--------------------------|
| Bisection | 2.000000 | 1 |
| Newton–Raphson | 2.000000 | 5 |
| Secant | 2.000000 | 6 |

All methods converged to the same correct root (**x = 2**).  
The **Newton–Raphson method** achieved the fastest convergence among the three.  

---

## Applications
Numerical root-finding methods are essential in:
- Scientific computation and modeling  
- Engineering analysis (mechanical, electrical, thermal)  
- Optimization algorithms and simulations  
- Financial forecasting and computational mathematics  

---

## Tools Used
- **GNU Octave 10.3.0** (MATLAB-compatible)  
- **Visual Studio Code / macOS Terminal**  
- **MkDocs Material** for documentation and site generation  
- **Git & GitHub** for version control and deployment  

---

## References
See the complete list of references in the [References](references.md) section.