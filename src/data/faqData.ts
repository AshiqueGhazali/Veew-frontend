

export interface Feature {
    question: string;
    answer: string;
  }
  
 
  export const features: Feature[] = [
    {
        question: "What is this platform?",
        answer: "This is an online event hosting platform where users can create and manage virtual events like webinars, seminars, and more. Users can take subscriptions or pay one-time pricing to host events and sell tickets to participants."
    },
    {
        question: "How do I host an online event?",
        answer: "To host an event, you need to subscribe to a plan or make a one-time payment. Once subscribed, you can create an event by filling out a simple 3-step form and share it with your audience. The event can either be free or paid, and users can book tickets via Razorpay if there are charges."
    },
    {
        question: "How do I join an online event?",
        answer: "You can join an event by entering the ticket code you received after booking. If the event is free, you can join directly without a ticket code."
    },
    {
        question: "Can I earn money from hosting events?",
        answer: "Yes, you can earn money by charging attendees for tickets. After the event is over, the ticket fees will be transferred to your wallet, and you can withdraw the funds whenever you want."
    },
    {
        question: "What other features are available?",
        answer: "As a user, you can view and edit your profile, manage your hosted events, and view your booked tickets. Additionally, you have access to a wallet that can be used for ticket purchases and withdrawals from ticket sales."
    }
  ];
  