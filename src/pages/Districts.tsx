import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Districts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);

  const districts = [
    {
  name: "Angul",
  quickFacts: "Known for coal mining and heavy industries",
  famousFoods: ["Arisa Pitha", "Manda Pitha"],
  touristPlaces: ["Satkosia Gorge", "Rengali Dam"],
  festivals: ["Nuakhai", "Durga Puja"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/angul.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d85.1!3d21.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19c4c1df6b5555%3A0x1234567890!2sAngul%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Balasore",
  quickFacts: "Coastal district with strategic importance",
  famousFoods: ["Rasabali", "Chhena Poda"],
  touristPlaces: ["Chandipur Beach", "Panchalingeswar Temple"],
  festivals: ["Rath Yatra", "Durga Puja"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/balasore.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d86.9!3d21.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sBalasore%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Balangir",
  quickFacts: "Known for handloom and agricultural produce",
  famousFoods: ["Arisa Pitha", "Khechedi"],
  touristPlaces: ["Harishankar Temple", "Gandhamardan Hills"],
  festivals: ["Nuakhai", "Dussehra"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/balangir.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d83.5!3d20.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sBalangir%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Bargarh",
  quickFacts: "Famous for Sambalpuri textiles",
  famousFoods: ["Pakhala", "Chaul Bara"],
  touristPlaces: ["Nrusinghanath Temple", "Debrigarh Wildlife Sanctuary"],
  festivals: ["Nuakhai", "Dhanu Yatra"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/bargarh.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d83.6!3d21.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sBargarh%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Bhadrak",
  quickFacts: "Known for its scenic beauty and religious sites",
  famousFoods: ["Rasagola", "Chhenapoda"],
  touristPlaces: ["Aradi Beach", "Bhadrakali Temple"],
  festivals: ["Rath Yatra", "Dola Purnima"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/bhadrak.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d86.5!3d21.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sBhadrak%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Boudh",
  quickFacts: "Known for pristine forests and wildlife",
  famousFoods: ["Pakhala", "Arisa Pitha", "Tribal Delicacies"],
  touristPlaces: ["Charichhak", "Manamunda Temple", "Ranipur Jharial Temple"],
  festivals: ["Nuakhai", "Durga Puja", "Chaitra Parba"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/boudh.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d84.3!3d20.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c8b123456789%3A0x9876543210!2sBoudh%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Cuttack",
  quickFacts: "Commercial capital, Silver Filigree hub",
  famousFoods: ["Thunka Puri", "Dahi Bara Aloo Dum"],
  touristPlaces: ["Barabati Fort", "Netaji Birth Place"],
  festivals: ["Bali Yatra", "Durga Puja", "Kite Festival"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/cuttack.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d85.9!3d20.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170543%3A0xfc580e2b68b33fa8!2sCuttack%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Deogarh",
  quickFacts: "Known for tribal culture",
  famousFoods: ["Pitha", "Tribal Cuisine"],
  touristPlaces: ["Pradhanpat Waterfall", "Khandadhar Waterfall"],
  festivals: ["Nuakhai", "Tribal Festivals"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/deogarh.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d84.7!3d21.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sDeogarh%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Dhenkanal",
  quickFacts: "Known for its natural beauty",
  famousFoods: ["Arisa Pitha", "Rasagola"],
  touristPlaces: ["Saptasajya", "Joranda Falls"],
  festivals: ["Rath Yatra", "Mahashivaratri"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/dhenkanal.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d85.6!3d20.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sDhenkanal%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Gajapati",
  quickFacts: "Tribal-dominated hill district",
  famousFoods: ["Tribal Foods", "Bamboo Shoot Curry"],
  touristPlaces: ["Mahendragiri", "Tibetan Settlement"],
  festivals: ["Chaitra Parba", "Tribal Festivals"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/gajapati.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d83.9!3d19.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sGajapati%2C%20Odisha!5e0!3m2"

    },
    {
  name: "Ganjam",
  quickFacts: "Known for beaches and silk sarees",
  famousFoods: ["Fish Curry", "Rasagola"],
  touristPlaces: ["Gopalpur Beach", "Taptapani Hot Springs"],
  festivals: ["Rath Yatra", "Durga Puja"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/ganjam.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d85.0!3d19.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sGanjam%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Jagatsinghpur",
  quickFacts: "Coastal district with beautiful beaches",
  famousFoods: ["Fish Curry", "Chhena Poda"],
  touristPlaces: ["Paradeep Beach", "Bhitarkanika"],
  festivals: ["Rath Yatra", "Kartik Purnima"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/jagatsinghpur.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d86.2!3d20.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sJagatsinghpur%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Jajpur",
  quickFacts: "Ancient Buddhist heritage site",
  famousFoods: ["Rasagola", "Arisa Pitha", "Kakera" , "Peda"],
  touristPlaces: ["Ratnagiri", "Udayagiri", "Lalitgiri", "Chatia Temple" ,"Biraja Temple"],
  festivals: ["Rath Yatra", "Buddha Purnima"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/jajpur.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d86.3!3d20.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1bd3e6c0000001%3A0x1234567890abcdef!2sJajpur%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Jharsuguda",
  quickFacts: "Industrial hub of western Odisha",
  famousFoods: ["Sambalpuri Cuisine"],
  touristPlaces: ["Hirakud Dam", "Ghanteswari Temple"],
  festivals: ["Nuakhai", "Durga Puja"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/jharsuguda.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d84.0!3d21.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sJharsuguda%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Kalahandi",
  quickFacts: "Known for folk dances and tribal art",
  famousFoods: ["Pakhala", "Tribal Delicacies"],
  touristPlaces: ["Phurlijharan", "Karlapat Wildlife Sanctuary"],
  festivals: ["Nuakhai", "Phagun Puni"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/kalahandi.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d83.2!3d19.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sKalahandi%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Kandhamal",
  quickFacts: "Hill station with coffee plantations",
  famousFoods: ["Tribal Foods", "Pineapple"],
  touristPlaces: ["Daringbadi", "Putudi Waterfall"],
  festivals: ["Chaiti Festival", "Nuakhai"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/kandhamal.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d84.1!3d20.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sKandhamal%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Kendrapara",
  quickFacts: "Known for Bhitarkanika National Park",
  famousFoods: ["Fish Curry", "Crab Preparations"],
  touristPlaces: ["Bhitarkanika", "Gahirmatha Beach"],
  festivals: ["Kartik Purnima", "Rath Yatra"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/kendrapara.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d86.4!3d20.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sKendrapara%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Kendujhar (Keonjhar)",
  quickFacts: "Rich in mineral resources and waterfalls",
  famousFoods: ["Tribal Cuisine", "Arisa Pitha"],
  touristPlaces: ["Sanaghagara Waterfall", "Gonasika"],
  festivals: ["Rath Yatra", "Tribal Festivals"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/kendujhar.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d85.6!3d21.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sKeonjhar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Khordha",
  quickFacts: "Bhubaneswar is located here ",
  famousFoods: ["Machha Jhola", "Santula", "Rasabali"],
  touristPlaces: ["Lingaraj Temple", "Ram Mandir", "Tapand Lake"],
  festivals: ["Rath Yatra", "Ekamra Utsav"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/khordha.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d85.6!3d20.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170543%3A0xfc580e2b68b33fa8!2sKhordha%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Koraput",
  quickFacts: "Known for tribal culture and coffee",
  famousFoods: ["Tribal Cuisine", "Ragi Preparations"],
  touristPlaces: ["Deomali", "Duduma Waterfall", "Gupteswar Cave"],
  festivals: ["Chaiti Parab", "Paraja Jatra"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/koraput.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d82.7!3d18.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sKoraput%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Malkangiri",
  quickFacts: "Southernmost district with thick forests",
  famousFoods: ["Tribal Foods"],
  touristPlaces: ["Satiguda Dam", "Malkangiri Ghat"],
  festivals: ["Tribal Festivals"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/malkangiri.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d82.0!3d18.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sMalkangiri%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},

{
  name: "Mayurbhanj",
  quickFacts: "Largest district, Similipal is here",
  famousFoods: ["Pakhala", "Chhena Jhili"],
  touristPlaces: ["Similipal National Park", "Barehipani Waterfall"],
  festivals: ["Rath Yatra", "Chhau Dance Festival"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/mayurbhanj.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d86.7!3d22.0!2m3"
    },
    {
  name: "Nabarangpur",
  quickFacts: "Known for tribal art and handicrafts",
  famousFoods: ["Tribal Delicacies"],
  touristPlaces: ["Karlapat Sanctuary", "Podagada Waterfalls"],
  festivals: ["Chaiti Parab", "Nuakhai"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/nabarangpur.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d82.5!3d19.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sNabarangpur%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},
{
  name: "Nayagarh",
  quickFacts: "Birthplace of Chhena Poda",
  famousFoods: ["Chhena Poda", "Arisa Pitha"],
  touristPlaces: ["Baisipalli Wildlife Sanctuary", "Odagaon"],
  festivals: ["Rath Yatra", "Durga Puja"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/nayagarh.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d85.1!3d20.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sNayagarh%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},
{
  name: "Nuapada",
  quickFacts: "Border district with agricultural economy",
  famousFoods: ["Pakhala", "Dalma"],
  touristPlaces: ["Sunabeda Wildlife Sanctuary"],
  festivals: ["Nuakhai", "Dussehra"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/nuapada.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d82.5!3d20.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sNuapada%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},
{
  name: "Puri",
  quickFacts: "Spiritual capital, home of Lord Jagannath",
  famousFoods: ["Mahaprasad", "Rasabali", "Khaja"],
  touristPlaces: ["Jagannath Temple", "Puri Beach", "Chilika"],
  festivals: ["Rath Yatra", "Snana Purnima", "Chandana Yatra"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/puri.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d85.8!3d19.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c528d5f1db2c7%3A0xd9e5e9e7e9e7e9e7!2sPuri%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},
{
  name: "Rayagada",
  quickFacts: "Tribal hub with diverse culture",
  famousFoods: ["Tribal Cuisine", "Bamboo Shoot"],
  touristPlaces: ["Minajhola Waterfall", "Maa Majhighariani Temple"],
  festivals: ["Chaiti Festival", "Tribal Dances"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/rayagada.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d83.4!3d19.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sRayagada%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},
{
  name: "Sambalpur",
  quickFacts: "Cultural capital of western Odisha",
  famousFoods: ["Pakhala", "Khechedi", "Chaul Bara"],
  touristPlaces: ["Hirakud Dam", "Samaleswari Temple", "Leaning Temple"],
  festivals: ["Nuakhai", "Sitalsasthi Carnival"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/sambalpur.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d83.9!3d21.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1a7aa8e1234567%3A0x9876543210abcdef!2sSambalpur%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},
{
  name: "Sonepur",
  quickFacts: "Known for its scenic beauty",
  famousFoods: ["Dalma", "Pakhala"],
  touristPlaces: ["Birmaharajpur", "Ulunda Island"],
  festivals: ["Nuakhai", "Durga Puja"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/sonepur.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d83.9!3d20.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sSonepur%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
},
{
  name: "Sundargarh",
  quickFacts: "Industrial and tribal district",
  famousFoods: ["Tribal Foods", "Chaul Bara"],
  touristPlaces: ["Khandadhar Falls", "Vedvyas Temple"],
  festivals: ["Nuakhai", "Chhau Festival"],
  imageUrl: "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/districts/sundargarh.jpg",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951040.3!2d84.0!3d22.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c7e5f1234567%3A0x1234567890!2sSundargarh%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
}

  ];

  const filteredDistricts = districts.filter(district =>
    district.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              All 30 Districts of Odisha
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore every corner of Odisha - from coastal plains to tribal highlands
            </p>

            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search districts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDistricts.map((district, idx) => (
              <Card 
                key={idx} 
                className="hover:shadow-card transition-smooth animate-fade-in cursor-pointer overflow-hidden group"
                onClick={() => setSelectedDistrict(district)}
              >
                {district.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={district.imageUrl} 
                      alt={district.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <h3 className="absolute bottom-3 left-4 text-2xl font-display font-bold text-white">
                      {district.name}
                    </h3>
                  </div>
                )}
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-muted-foreground italic">
                    {district.quickFacts}
                  </p>

                  <div className="space-y-3 border-t border-border pt-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Famous Foods</h4>
                      <div className="flex flex-wrap gap-2">
                        {district.famousFoods.map((food, fidx) => (
                          <Badge key={fidx} variant="secondary">{food}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Tourist Places</h4>
                      <div className="flex flex-wrap gap-2">
                        {district.touristPlaces.map((place, pidx) => (
                          <Badge key={pidx} variant="outline">{place}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Famous Festivals</h4>
                      <div className="flex flex-wrap gap-2">
                        {district.festivals.map((festival, fidx) => (
                          <Badge key={fidx} className="bg-primary/10 text-primary hover:bg-primary/20">
                            {festival}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4" variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    View Map
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDistricts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No districts found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!selectedDistrict} onOpenChange={() => setSelectedDistrict(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-display">{selectedDistrict?.name}</DialogTitle>
          </DialogHeader>
          {selectedDistrict && (
            <div className="space-y-6">
              {selectedDistrict.imageUrl && (
                <img 
                  src={selectedDistrict.imageUrl} 
                  alt={selectedDistrict.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              
              <p className="text-muted-foreground italic text-lg">
                {selectedDistrict.quickFacts}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Famous Foods</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDistrict.famousFoods.map((food: string, fidx: number) => (
                      <Badge key={fidx} variant="secondary">{food}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Tourist Places</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDistrict.touristPlaces.map((place: string, pidx: number) => (
                      <Badge key={pidx} variant="outline">{place}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Famous Festivals</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDistrict.festivals.map((festival: string, fidx: number) => (
                      <Badge key={fidx} className="bg-primary/10 text-primary hover:bg-primary/20">
                        {festival}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {selectedDistrict.mapUrl && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    District Map
                  </h4>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe 
                      src={selectedDistrict.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Districts;