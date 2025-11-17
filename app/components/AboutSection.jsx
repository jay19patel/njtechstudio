"use client";

export default function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">NJ Tech Studio</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming ideas into powerful digital solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              Building Tomorrow's Technology Today
            </h3>
            <p className="text-gray-600 leading-relaxed">
              At NJ Tech Studio, we are passionate about creating innovative software solutions
              that drive business growth and digital transformation. With years of expertise in
              web development, mobile apps, and custom software solutions, we help businesses
              achieve their digital goals.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team of skilled developers, designers, and strategists work collaboratively
              to deliver high-quality, scalable solutions tailored to your unique needs. We
              combine cutting-edge technology with creative thinking to build products that
              make a difference.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600 text-sm">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
                <div className="text-gray-600 text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-6">Our Mission</h4>
              <p className="mb-6 leading-relaxed">
                To empower businesses with innovative technology solutions that drive growth,
                efficiency, and success in the digital age.
              </p>
              <h4 className="text-2xl font-bold mb-6">Our Vision</h4>
              <p className="leading-relaxed">
                To be a leading technology partner known for delivering exceptional digital
                experiences and transformative solutions that shape the future.
              </p>
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-blue-100 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
