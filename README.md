# Math 221 – Numerical Analysis Project

**Live Website:** **[https://shoug-alomran.github.io/Math221_Numerical-Analysis/](https://shoug-alomran.github.io/Math221_Numerical-Analysis/)**

This repository contains the **Numerical Analysis (Math 221)** course project, which implements and compares three numerical methods for solving nonlinear equations: **Bisection**, **Newton–Raphson**, and **Secant**.

The project demonstrates how these iterative algorithms converge toward the same root and includes visual validation using MATLAB/Octave.

---

## Overview

The goal of this project is to analyze and compare three numerical root-finding methods in terms of:
- Convergence speed  
- Accuracy  
- Number of iterations required  
- Practical applications in computational science  

The study emphasizes how iterative techniques provide approximate solutions where analytical methods are infeasible.

---

## Key Features

- Step-by-step iteration logs printed in the terminal  
- Approximate root computation for each method  
- Function plot showing the true root at **x = 2**  
- Simple, well-commented code for clarity and learning  

---

## Results

| Method           | Approximate Root | Converged in Iterations |
|------------------|------------------|--------------------------|
| Bisection        | 2.000000         | 1                        |
| Newton–Raphson   | 2.000000         | 5                        |
| Secant           | 2.000000         | 6                        |

All three methods converged to the same correct root (**x = 2**).  
Among them, **Newton–Raphson** achieved the fastest convergence.

---

## Applications

Numerical methods like these are widely used in **Computer Science** and **Engineering** for:
- Root-finding in algorithm design and simulation  
- Optimization problems in machine learning  
- Solving nonlinear equations in control systems and physics models  
- Numerical analysis in applied mathematics and data modeling  

---

## Tools Used
- **GNU Octave 10.3.0** (MATLAB-compatible environment)  
- **macOS Terminal / Visual Studio Code** for development  
- **Git & GitHub** for version control and collaboration  
- **MkDocs Material** for project documentation and report publishing  

---

## Author
**Shoug Alomran**  
Prince Sultan University — Math 221  
Fall 2025
