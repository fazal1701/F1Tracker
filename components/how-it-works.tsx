"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Database, Brain, BarChart3, Shuffle, Trophy, CheckCircle } from "lucide-react"

export function HowItWorks() {
  // Mock model performance data
  const performanceData = [
    { metric: "Accuracy", value: 78.5 },
    { metric: "Precision", value: 82.1 },
    { metric: "Recall", value: 75.3 },
    { metric: "F1-Score", value: 78.6 },
  ]

  const featureImportanceData = [
    { feature: "Qualifying Position", importance: 35 },
    { feature: "Team Performance", importance: 28 },
    { feature: "Weather Conditions", importance: 15 },
    { feature: "Track Temperature", importance: 12 },
    { feature: "Driver Form", importance: 10 },
  ]

  const steps = [
    {
      icon: <Database className="h-8 w-8 text-blue-500" />,
      title: "Data Collection",
      description:
        "Gather historical race data, driver statistics, team performance, weather conditions, and track characteristics from 2000+ F1 races.",
      details: [
        "Race results and lap times",
        "Qualifying positions",
        "Weather and track conditions",
        "Team and driver statistics",
      ],
    },
    {
      icon: <Brain className="h-8 w-8 text-green-500" />,
      title: "Feature Engineering",
      description: "Transform raw data into meaningful features that capture racing dynamics and performance patterns.",
      details: [
        "Driver form and consistency metrics",
        "Team performance trends",
        "Track-specific advantages",
        "Weather impact factors",
      ],
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
      title: "Model Training",
      description: "Train XGBoost ensemble model on engineered features to predict race outcomes with high accuracy.",
      details: [
        "XGBoost gradient boosting",
        "Cross-validation tuning",
        "Feature importance analysis",
        "Model validation",
      ],
    },
    {
      icon: <Shuffle className="h-8 w-8 text-orange-500" />,
      title: "Monte Carlo Simulation",
      description: "Run thousands of race simulations to account for uncertainty and provide confidence intervals.",
      details: ["10,000+ simulation runs", "Probabilistic outcomes", "Uncertainty quantification", "Scenario analysis"],
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Prediction & Ranking",
      description:
        "Aggregate simulation results to generate final predictions with confidence scores and explanations.",
      details: [
        "Probability distributions",
        "Confidence intervals",
        "Feature explanations",
        "Interactive visualizations",
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🧠 How the AI Prediction Model Works</CardTitle>
          <CardDescription>
            Our F1 race predictor combines machine learning, statistical modeling, and Monte Carlo simulation to provide
            accurate and explainable race predictions.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Process Timeline */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Model Pipeline</h3>
        {steps.map((step, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{step.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold">{step.title}</h4>
                    <Badge variant="outline">Step {index + 1}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Model Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📈 Model Performance</CardTitle>
            <CardDescription>Performance metrics on validation dataset (2020-2024 seasons)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎯 Feature Importance</CardTitle>
            <CardDescription>Which factors matter most for race predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={featureImportanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 40]} />
                <YAxis dataKey="feature" type="category" width={120} fontSize={12} />
                <Tooltip formatter={(value) => [`${value}%`, "Importance"]} />
                <Bar dataKey="importance" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>⚙️ Technical Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Machine Learning</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• XGBoost ensemble model</li>
                <li>• Gradient boosting algorithm</li>
                <li>• Hyperparameter optimization</li>
                <li>• Cross-validation</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Data Sources</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Official F1 timing data</li>
                <li>• Weather APIs</li>
                <li>• Historical race results</li>
                <li>• Driver/team statistics</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Simulation</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Monte Carlo methods</li>
                <li>• Probabilistic modeling</li>
                <li>• Uncertainty quantification</li>
                <li>• Scenario analysis</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Limitations */}
      <Card>
        <CardHeader>
          <CardTitle>⚠️ Model Limitations & Considerations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Unpredictable Events</h4>
              <p className="text-yellow-700 text-sm">
                The model cannot predict completely random events like mechanical failures, crashes, or unprecedented
                weather conditions.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Historical Bias</h4>
              <p className="text-blue-700 text-sm">
                Predictions are based on historical patterns and may not account for sudden changes in team performance
                or regulation changes.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Continuous Learning</h4>
              <p className="text-green-700 text-sm">
                The model is regularly updated with new race data to improve accuracy and adapt to evolving F1 dynamics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
