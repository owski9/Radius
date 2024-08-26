'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Save, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const formSchema = z.object({
  wispServer: z.string(),
  bareServer: z.string(),
  transport: z.string()
})

export default function Settings() {
  const [submitting, setSubmitting] = useState(false)
  const [transport, setTransport] = useState(localStorage.getItem('transport') || 'epoxy')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wispServer: localStorage.getItem('wispSrv') || 'wss://wisp.mercurywork.shop',
      bareServer: localStorage.getItem('bareSrv') || 'https://tomp.app',
      transport: transport
    }
  })

  useEffect(() => {
    localStorage.setItem('transport', transport)
  }, [transport])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true)

    setTimeout(() => {
      localStorage.setItem('wispSrv', values.wispServer)
      localStorage.setItem('bareSrv', values.bareServer)
      localStorage.setItem('transport', values.transport)
      
      setSubmitting(false)
      toast.success('Settings saved')
    }, 1000)
    console.log(values)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-semibold">Proxy</h1>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-4">
          <FormField
            control={form.control}
            name="wispServer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wisp Server</FormLabel>
                <FormControl>
                  <Input placeholder="wss://wisp.mercurywork.shop" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bareServer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bare Server (bare transport only)</FormLabel>
                <FormControl>
                  <Input placeholder="https://tomp.app" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transport</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={(value: any) => {
                    field.onChange(value)
                    setTransport(value)
                  }}>
                    <SelectTrigger className="flex items-center px-4 py-2 border rounded">
                      {field.value}
                      <ChevronDown className="ml-2 transition-transform rotate-0" />
                    </SelectTrigger>
                    <SelectContent className="absolute mt-2 bg-white border rounded shadow-lg">
                      <SelectItem value="epoxy">Epoxy</SelectItem>
                      <SelectItem value="baremod">Baremod</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={submitting}>
            <Save className="mr-2 h-5 w-5" /> Save Changes
          </Button>
        </form>
      </Form>
    </div>
  )
}
