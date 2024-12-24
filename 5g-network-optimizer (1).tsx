'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { optimizeNetworkTraffic } from './ai-optimizer'
import { generateTrafficData } from './traffic-generator'

export default function NetworkOptimizer() {
  const [trafficLoad, setTrafficLoad] = useState(50)
  const [originalData, setOriginalData] = useState(generateTrafficData(trafficLoad))
  const [optimizedData, setOptimizedData] = useState(null)

  const handleOptimize = () => {
    const optimized = optimizeNetworkTraffic(originalData)
    setOptimizedData(optimized)
  }

  const handleTrafficLoadChange = (value: number[]) => {
    setTrafficLoad(value[0])
    setOriginalData(generateTrafficData(value[0]))
    setOptimizedData(null)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>AI-Powered 5G Network Traffic Optimization</CardTitle>
        <CardDescription>Simulate and optimize 5G network traffic using AI techniques</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="traffic-load">Traffic Load</Label>
            <Slider
              id="traffic-load"
              min={10}
              max={100}
              step={1}
              value={[trafficLoad]}
              onValueChange={handleTrafficLoadChange}
            />
            <div className="text-sm text-muted-foreground">Current load: {trafficLoad}%</div>
          </div>
          <Button onClick={handleOptimize}>Optimize Network Traffic</Button>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={originalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="traffic" stroke="#8884d8" name="Original Traffic" />
                {optimizedData && (
                  <Line type="monotone" dataKey="traffic" stroke="#82ca9d" name="Optimized Traffic" data={optimizedData} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

