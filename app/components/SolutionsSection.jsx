"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const solutionsData = {
  "web-development": {
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies. From responsive designs to complex web platforms, we deliver scalable solutions that drive your business forward.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&h=600&auto=format&fit=crop",
    benefits: [
      "Responsive and mobile-first designs",
      "Modern frameworks (React, Next.js, Vue.js)",
      "SEO optimized websites",
      "Fast loading and performance",
      "Scalable architecture"
    ]
  },
  "erpnext-flows": {
    title: "ERPNext Flows for Business",
    description: "Streamline your business operations with custom ERPNext workflows. We design and implement automated processes that enhance productivity and reduce manual work.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&h=600&auto=format&fit=crop",
    benefits: [
      "Custom workflow automation",
      "Business process optimization",
      "Integration with existing systems",
      "Real-time reporting and analytics",
      "Reduced manual work"
    ]
  },
  "ai-automation": {
    title: "AI Integrations & Automation",
    description: "Leverage artificial intelligence to automate tasks, analyze data, and enhance decision-making. Smart integrations that transform how your business operates.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&h=600&auto=format&fit=crop",
    benefits: [
      "AI-powered automation solutions",
      "Data analysis and insights",
      "Chatbot and virtual assistants",
      "Predictive analytics",
      "Smart decision-making tools"
    ]
  },
  "custom-scripts-iot": {
    title: "Custom Scripts & IoT Applications",
    description: "Tailored scripting solutions and IoT applications that connect devices, collect data, and enable smart automation for your specific business needs.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&h=600&auto=format&fit=crop",
    benefits: [
      "Custom script development",
      "IoT device integration",
      "Real-time data collection",
      "Smart automation systems",
      "Device connectivity solutions"
    ]
  },
  "mobile-app": {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android. User-friendly interfaces with seamless performance and modern design principles.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&h=600&auto=format&fit=crop",
    benefits: [
      "Native iOS and Android apps",
      "Cross-platform solutions",
      "Modern UI/UX design",
      "App store optimization",
      "Performance optimization"
    ]
  },
  "cloud-devops": {
    title: "Cloud Solutions & DevOps",
    description: "Scalable cloud infrastructure and DevOps practices. We help you deploy, manage, and scale your applications efficiently with modern cloud technologies.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&h=600&auto=format&fit=crop",
    benefits: [
      "Cloud infrastructure setup",
      "CI/CD pipeline implementation",
      "Containerization and orchestration",
      "Auto-scaling solutions",
      "Monitoring and maintenance"
    ]
  }
};

export default function SolutionsSection() {
  const [activeTab, setActiveTab] = useState("web-development");

  const getCurrentSolution = () => {
    return solutionsData[activeTab] || solutionsData["web-development"];
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 ">
      <div className="text-center">
        {/* Heading */}
        <div className="space-y-2 mb-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
            Our <span className="text-indigo-600">Solutions</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-500 pt-2 max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to transform your business and drive growth
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="web-development" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8 overflow-x-auto">
            <TabsList className="inline-flex items-center gap-0 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 p-1 flex-wrap lg:flex-nowrap">
              <TabsTrigger 
                value="web-development"
                className="px-4 lg:px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors text-sm lg:text-base data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-300 whitespace-nowrap"
              >
                Web Development
              </TabsTrigger>
              <TabsTrigger 
                value="erpnext-flows"
                className="px-4 lg:px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors text-sm lg:text-base data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-300 whitespace-nowrap"
              >
                ERPNext Flows
              </TabsTrigger>
              <TabsTrigger 
                value="ai-automation"
                className="px-4 lg:px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors text-sm lg:text-base data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-300 whitespace-nowrap"
              >
                AI & Automation
              </TabsTrigger>
              <TabsTrigger 
                value="custom-scripts-iot"
                className="px-4 lg:px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors text-sm lg:text-base data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-300 whitespace-nowrap"
              >
                Scripts & IoT
              </TabsTrigger>
              <TabsTrigger 
                value="mobile-app"
                className="px-4 lg:px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors text-sm lg:text-base data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-300 whitespace-nowrap"
              >
                Mobile Apps
              </TabsTrigger>
              <TabsTrigger 
                value="cloud-devops"
                className="px-4 lg:px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors text-sm lg:text-base data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-300 whitespace-nowrap"
              >
                Cloud & DevOps
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Content */}
          <TabsContent value={activeTab} className="mt-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-0">
                {/* Image Section - 30% */}
                <div className="relative w-full lg:w-[30%] h-64 lg:h-auto min-h-[300px] overflow-hidden">
                  <img
                    src={getCurrentSolution().image}
                    alt={getCurrentSolution().title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Content Section - 70% */}
                <div className="w-full lg:w-[70%] p-8 lg:p-10 flex flex-col justify-center">
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {getCurrentSolution().title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base lg:text-lg mb-6">
                    {getCurrentSolution().description}
                  </p>
                  
                  {/* Benefits List */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {getCurrentSolution().benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-indigo-600 mt-1">✓</span>
                          <span className="text-gray-600 text-sm lg:text-base">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

