import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PollCreateForm } from '../../../components/polls/poll-create-form';
import { useRouter } from 'next/navigation';
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
// global.d.ts



// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('PollCreateForm Unit Tests', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Happy Path Test: Form renders correctly
  test('should render the form with title, description, and two options', () => {
    const { container, } = render(<PollCreateForm />);

    expect(screen.getByLabelText(/Questions/i)).toBeTruthy();
    expect(screen.getByLabelText(/Description \(Optional\)/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Option 1/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Option 2/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Add Option/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Create Poll/i })).toBeTruthy();
  });

  // Happy Path Test: Submits valid data and redirects
  test('should submit valid data and redirect to polls page', async () => {
    render(<PollCreateForm />);

    fireEvent.change(screen.getByLabelText(/Questions/i), {
      target: { value: 'What is your favorite color?' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Option 1/i), {
      target: { value: 'Blue' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Option 2/i), {
      target: { value: 'Red' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Create Poll/i }));

    // Wait for the asynchronous submission to complete
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Creating Poll.../i })).toHaveAttribute('disabled');
    });

    // Simulate the setTimeout delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(useRouter().push).toHaveBeenCalledWith('/polls');
    // console.log is mocked by default in Jest, so we can assert on it
    // expect(console.log).toHaveBeenCalledWith('Poll data:', expect.any(Object));
  });

  // Edge Case: Adding and removing options
  test('should allow adding and removing options', () => {
    render(<PollCreateForm />);

    // Add an option
    fireEvent.click(screen.getByRole('button', { name: /Add Option/i }));
    expect(screen.getByPlaceholderText(/Option 3/i)).toBeTruthy();

    // Remove an option (should remove Option 3)
    const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
    fireEvent.click(removeButtons[2]); // Click the third remove button (for Option 3)
    expect(screen.queryByPlaceholderText(/Option 3/i)).toBeNull();

    // Should not be able to remove if only two options remain
    expect(removeButtons[0]).toBeDisabled();
    expect(removeButtons[1]).toBeDisabled();
  });

  // Failure Case: Display error messages for empty required fields
  test('should display error messages for empty required fields on submission', async () => {
    render(<PollCreateForm />);

    fireEvent.click(screen.getByRole('button', { name: /Create Poll/i }));

    await waitFor(() => {
      expect(screen.getByText(/Poll Question is required/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Option text is required/i).length).toBeGreaterThanOrEqual(2);
    });
  });
});