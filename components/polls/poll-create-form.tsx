'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

interface PollOption {
  id: string;
  text: string;
}
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1, { message: "Poll question is required." }),
  description: z.string().optional(),
  options: z.array(
    z.object({
      id: z.string(),
      text: z.string().min(1, { message: "Option text is required." }),
    })
  ).min(2, { message: "Please add at least two options." }),
});

type PollFormValues = z.infer<typeof formSchema>;

export function PollCreateForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PollFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      options: [
        { id: '1', text: '' },
        { id: '2', text: '' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options"
  });

  const onSubmit = async (data: PollFormValues) => {
    setIsSubmitting(true);
    // This would be replaced with actual poll creation logic
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to polls page after successful creation
      router.push('/polls');
    }, 1000);
  };

  const addOption = () => {
    append({ id: `${fields.length + 1}`, text: '' });
  };

  const removeOption = (index: number) => {
    if (fields.length > 2) {
      remove(index);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Questions</FormLabel>
              <FormControl>
                <Input placeholder="What is your favorite programming language?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Provide more context about your poll" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <FormLabel>Poll Options</FormLabel>
            <Button type="button" variant="outline" size="sm" onClick={addOption}>
              Add Option
            </Button>
          </div>
          <FormDescription>
            Add at least 2 options for people to choose from.
          </FormDescription>

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`options.${index}.text`}
                render={({ field: inputField }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input placeholder={`Option ${index + 1}`} {...inputField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeOption(index)}
                disabled={fields.length <= 2}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        <Button type="submit"  className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Poll...' : 'Create Poll'}
        </Button>
      </form>
    </Form>
  );
}