Thinking in (Data Pipe) Components

  - Introduction
    1. Good evening, I'm Chris, I work on the Polymer library.
      a. This is my contact info in case you make it out of this talk alive and
         alive and motivated to talk about this more.
    2. Show of hands:
      a. How many of you have integrated an API backend with a Polymer App?
      b. How many of you have made Polymer components that wrap your API resources?
    3. In this presentation, I'm going show you how to do both of those things.

  - Brief history of recent discussion
    1. At the Polymer Summit in Amsterdam, Kevin Schaaf gave an illuminating talk
       on thinking in Polymer.
      a. Custom Elements are the missing ingredient for interoperable components
         on the web.
      b. Custom Elements rely on a common protocol (DOM) that enables
         interoperability by default for components.
    2. Rob Dodson gave a really cool talk on "end to end" apps with Polymer.
      a. Exposed "TODO" data as a component.
      b. Demonstrated how Custom Elements can be used as a facade for data
         manipulation.
    3. I want to invite you all to go diving with me. We're going to dive deep
       into this topic and discuss the philosophy and approaches to facading
       data access with Custom Elements, to create portable, re-usable data
       pipe components for your app.

  - Okay, so before we go diving: who here is old enough to remember Word Art?
