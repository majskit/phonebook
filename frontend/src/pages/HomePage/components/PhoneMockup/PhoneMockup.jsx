import s from "./PhoneMockup.module.css";

const CONTACTS_DATA = [
  {
    id: 1,
    avatar: "👤",
    name: "John Doe",
    phone: "+1 234 567 8900",
  },
  {
    id: 2,
    avatar: "👩",
    name: "Jane Smith",
    phone: "+1 234 567 8901",
  },
  {
    id: 3,
    avatar: "👨",
    name: "Mike Johnson",
    phone: "+1 234 567 8902",
  },
];

const PhoneMockup = () => {
  return (
    <div className={s.phoneGraphic}>
      <div className={s.phone}>
        <div className={s.phoneScreen}>
          {CONTACTS_DATA.map((contact) => (
            <div key={contact.id} className={s.phoneContact}>
              <div className={s.avatar}>{contact.avatar}</div>
              <div className={s.contactInfo}>
                <p className={s.contactName}>{contact.name}</p>
                <p className={s.contactPhone}>{contact.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
