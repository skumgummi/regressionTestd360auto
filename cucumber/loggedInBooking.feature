Feature: Logged in user booking

Scenario: Logged in user wants to book a ticket
  Given I am logged in
  When I book a ticket
  Then that ticket shows up in My trips
