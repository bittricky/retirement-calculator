# Retirement Calculator

A sophisticated retirement planning tool that runs a simulation to provide realistic retirement projections.

## Features

- Real-time retirement calculations
- Monte Carlo simulations for realistic projections
- Interactive input controls
- Visual progress tracking
- Success rate analysis
- Dark mode support

## How It Works

### Monte Carlo Simulation

The calculator uses [Monte Carlo simulation](https://en.wikipedia.org/wiki/Monte_Carlo_method) to model the uncertainty in retirement planning. Instead of using a single fixed rate of return, it:

1. Runs 1,000 different scenarios
2. Each scenario uses random returns from your specified range
3. Tracks how many scenarios result in successful retirement
4. Calculates a success rate based on these simulations

This approach provides a more realistic view of retirement outcomes by accounting for market volatility and various economic factors.

### Calculation Methodology

The calculator performs two main phases of calculations:

#### Accumulation Phase (Pre-Retirement)

- Applies investment returns to current savings
- Adds monthly contributions
- Adjusts for inflation
- Accounts for taxes on investment gains

#### Retirement Phase

- Calculates retirement expenses with inflation adjustment
- Includes Social Security benefits when eligible
- Applies investment returns to remaining savings
- Accounts for taxes on withdrawals

### Success Rate

The success rate indicates the percentage of scenarios where your savings last through retirement:

- ≥80%: Strong retirement plan (Green)
- 60-79%: Moderate risk (Yellow)
- <60%: High risk (Red)

## Local Development Setup

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd retirement-calculator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

---

This project was an exercise to learn about the Monte Carlo Simulation method. What it does, How it works, and how to use it. Speak to a professional financial planner if you are serious about retirement planning. The calculator is not intended to be a substitute for professional financial advice.
