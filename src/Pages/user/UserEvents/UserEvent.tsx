import React from 'react'
import UserProfileEventCard from '../../../Components/user/UserProfileEvents/UserProfileEventCard';


const contacts = [
    {
        name: 'Jane Cooper',
        role: 'Admin',
        position: 'Regional Paradigm Technician',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        name: 'Cody Fisher',
        role: 'Admin',
        position: 'Product Directives Officer',
        imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
        name: 'Esther Howard',
        role: 'Admin',
        position: 'Forward Response Developer',
        imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        name: 'Jenny Wilson',
        role: 'Admin',
        position: 'Central Security Manager',
        imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
        name: 'Kristin Watson',
        role: 'Admin',
        position: 'Lead Implementation Liaison',
        imageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    {
        name: 'Cameron Williamson',
        role: 'Admin',
        position: 'Internal Applications Engineer',
        imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
    },
];

const UserEvent:React.FC = () => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {contacts.map((contact, index) => (
        <UserProfileEventCard
            key={index}
            name={contact.name}
            role={contact.role}
            position={contact.position}
            imageUrl={contact.imageUrl}
        />
    ))}
</div>
  )
}

export default UserEvent