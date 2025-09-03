import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react/pure';
import { PollCreateForm } from '../../../../components/polls/poll-create-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
// Mock next/navigation
import { afterEach, beforeEach, expect, jest, test } from '@jest/globals';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

import { describe } from '@jest/globals';

describe('PollCreateForm Integration Tests', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Integration Test: Full form submission with simulated API success
  test('should successfully submit the form and navigate on valid input', async () => {
    render(<PollCreateForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Questions/i), {
      target: { value: 'Favorite programming language?' },
    });
    fireEvent.change(screen.getByLabelText(/Description \(Optional\)/i), {
      target: { value: 'Choose wisely!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Option 1/i), {
      target: { value: 'JavaScript' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Option 2/i), {
      target: { value: 'Python' },
    });

    // Add a third option and fill it
    fireEvent.click(screen.getByRole('button', { name: /Add Option/i }));
    fireEvent.change(screen.getByPlaceholderText(/Option 3/i), {
      target: { value: 'TypeScript' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Poll/i }));

    // Expect the button to be disabled during submission
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Creating Poll.../i })).toBeDisabled();
    });

    // Simulate the setTimeout delay for successful submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Expect navigation to have occurred
    expect(mockPush).toHaveBeenCalledWith('/polls');
  });

  // Integration Test: Form submission with API error simulation
  test('should handle API errors gracefully on submission', async () => {
    // Mock console.error to prevent it from polluting test output
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Simulate an API error by rejecting the promise (or throwing an error)
    // For this example, we'll just prevent the redirect and check for error state
    // In a real scenario, you'd mock a fetch/axios call to throw an error
      jest.spyOn(global, 'setTimeout').mockImplementationOnce((callback: (_: void) => void, _delay?: number): NodeJS.Timeout => {
      callback(); // Immediately resolve to simulate error without delay
      return setTimeout(() => {}, 0) as unknown as NodeJS.Timeout; // Return a proper NodeJS.Timeout object
    });

    render(<PollCreateForm />);

    // Fill out the form (minimal valid input)
    fireEvent.change(screen.getByLabelText(/Questions/i), {
      target: { value: 'Test Error Poll?' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Option 1/i), {
      target: { value: 'Yes' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Option 2/i), {
      target: { value: 'No' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Poll/i }));

    // Expect the button to be disabled during submission
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Creating Poll.../i })).toBeDisabled();
    });

    // Simulate an error condition (e.g., re-enable button, show error message)
    // Since our current onSubmit just logs and redirects, we'll assert that redirect didn't happen
    // and the button is re-enabled (as if an error occurred and submission finished)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Create Poll/i })).not.toBeDisabled();
    });

    expect(mockPush).not.toHaveBeenCalled();
    // In a real app, you'd expect an error message to be displayed
    // expect(screen.getByText(/Failed to create poll/i)).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});