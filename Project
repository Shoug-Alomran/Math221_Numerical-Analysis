% ============================================================
% Math 221 Project
% Numerical Solution of f(x) = x^2 - 4 using Three Methods:
%   1) Bisection
%   2) Newton–Raphson
%   3) Secant
%
% This project demonstrates how each method approximates the
% root of the same nonlinear equation and compares accuracy
% and convergence.
% ============================================================

clear; clc; close all;

% Define the function and its derivative
f  = @(x) x.^2 - 4;    % Given function
df = @(x) 2*x;         % Derivative for Newton–Raphson method

tol = 1e-6;            % Tolerance for stopping condition
maxIter = 50;          % Maximum allowed iterations

%% ------------------------------------------------------------
%% 1) Bisection Method
% Based on the Intermediate Value Theorem. The interval [a,b]
% must have opposite signs for f(a) and f(b).
%% ------------------------------------------------------------

a = 1; b = 3;
fprintf('\n--- Bisection Method ---\n');

if f(a)*f(b) >= 0
    error('Invalid interval: f(a) and f(b) must have opposite signs.');
end

for k = 1:maxIter
    p = (a + b)/2;
    if f(a)*f(p) < 0
        b = p;
    else
        a = p;
    end
    fprintf('Iter %2d: p = %.6f, f(p) = %.6f\n', k, p, f(p));
    if abs(f(p)) < tol || (b - a)/2 < tol
        root_bis = p;
        break;
    end
end
fprintf('Approximate root (Bisection) = %.6f\n', root_bis);

%% ------------------------------------------------------------
%% 2) Newton–Raphson Method
% Uses derivative information to converge quickly to the root.
%% ------------------------------------------------------------

x0 = 3;
fprintf('\n--- Newton–Raphson Method ---\n');

for k = 1:maxIter
    x1 = x0 - f(x0)/df(x0);
    fprintf('Iter %2d: x = %.6f, f(x) = %.6f\n', k, x1, f(x1));
    if abs(x1 - x0) < tol
        root_newton = x1;
        break;
    end
    x0 = x1;
end
fprintf('Approximate root (Newton–Raphson) = %.6f\n', root_newton);

%% ------------------------------------------------------------
%% 3) Secant Method
% Similar to Newton’s method but does not require a derivative.
%% ------------------------------------------------------------

x0 = 1; x1 = 3;
fprintf('\n--- Secant Method ---\n');

for k = 1:maxIter
    x2 = x1 - f(x1)*(x1 - x0)/(f(x1) - f(x0));
    fprintf('Iter %2d: x = %.6f, f(x) = %.6f\n', k, x2, f(x2));
    if abs(x2 - x1) < tol
        root_sec = x2;
        break;
    end
    x0 = x1;
    x1 = x2;
end
fprintf('Approximate root (Secant) = %.6f\n', root_sec);

%% ------------------------------------------------------------
%% 4) Summary and Plot
% Display all computed results and visualize the function.
%% ------------------------------------------------------------

fprintf('\n--- Summary of Results ---\n');
fprintf('Bisection:      %.6f\n', root_bis);
fprintf('Newton–Raphson: %.6f\n', root_newton);
fprintf('Secant:         %.6f\n', root_sec);

% Plot the function and show the root location
figure;
fplot(f, [0, 4], 'LineWidth', 1.5);
hold on;
plot([0 4], [0 0], '--k');      % x-axis
plot([2 2], [-5 5], ':r');      % true root line
title('f(x) = x^2 - 4  |  Root at x = 2');
xlabel('x'); ylabel('f(x)');
grid on;
legend('f(x)', 'y=0', 'x=2 (true root)', 'Location', 'best');
