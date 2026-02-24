# Math 221 — Numerical Analysis Project  

### Prince Sultan University  
**Course:** Math 221: Numerical Analysis  
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
This project was completed collaboratively. **Shoug Alomran** led the implementation, documentation, and site publishing, while **Shahad Abunayan** and **Manar Altuwaim** contributed to the **handwritten derivations, theoretical analysis, and manual calculations** of all numerical methods.

---

## Project Title
**Comparison of Numerical Methods for Solving Nonlinear Equations**  
*(Bisection, Newton–Raphson, and Secant Methods)*  

---

## Abstract  

This project studies three numerical methods — **Bisection**, **Newton–Raphson**, and **Secant** — to find the root of nonlinear equations that cannot be solved exactly.  
Each method was implemented using **GNU Octave**, and the results were compared based on convergence speed, accuracy, and stability.  

All three methods reached the same correct root (**x = 2**).  
The **Newton–Raphson Method** converged the fastest, followed by **Secant**, while **Bisection** remained the most reliable though slower.

---

## Objectives  

1. Apply and compare classical numerical root-finding methods.  
2. Study their convergence rate, accuracy, and computational efficiency.  
3. Display results through tables and graphs.  
4. Strengthen understanding of iterative numerical analysis through practical implementation.  

---

## Methods Used  
| Method | Description | Characteristics |
|--------|--------------|----------------|
| **Bisection Method** | Divides an interval repeatedly to locate the root. | Slow but guaranteed convergence. |
| **Newton–Raphson Method** | Uses tangent lines based on derivatives to find the root. | Fast but requires a good initial guess. |
| **Secant Method** | Approximates the derivative using two points. | Moderate speed and simple to implement. |

---

## Results Summary  

| Method | Approximate Root | Iterations |
|--------|------------------|-------------|
| **Bisection** | 2.000000 | 1 |
| **Newton–Raphson** | 2.000000 | 5 |
| **Secant** | 2.000000 | 6 |

All methods converged to the same root (**x = 2**).  
The **Newton–Raphson Method** was the fastest, confirming the theory discussed in class.

---

## Applications  

Numerical root-finding methods are widely used in: 

- Engineering and physics modeling  
- Optimization and computer algorithms  
- Financial and economic calculations  
- Simulation and control systems  

---

## Tools Used  

- **GNU Octave 10.3.0** (compatible with MATLAB)  
- **Visual Studio Code / macOS Terminal**  
- **MkDocs Material** for creating this digital report  
- **Git & GitHub** for version control and deployment  

---

## References  
See the complete list in the [References](references.md) section.