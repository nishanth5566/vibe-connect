 import { useState, useEffect } from "react";
 import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
 } from "@/components/ui/sheet";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Label } from "@/components/ui/label";
 import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
 import { Camera, Check } from "lucide-react";
 import { toast } from "sonner";
 import type { UserProfile } from "@/pages/MainApp";
 import { vibeOptions } from "@/data/vibes";
 import { cn } from "@/lib/utils";
 
 interface EditProfileSheetProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   userProfile: UserProfile;
   onSave: (profile: Partial<UserProfile>) => void;
 }
 
 const EditProfileSheet = ({
   open,
   onOpenChange,
   userProfile,
   onSave,
 }: EditProfileSheetProps) => {
   const [name, setName] = useState(userProfile.name);
   const [bio, setBio] = useState(userProfile.bio);
   const [age, setAge] = useState(userProfile.age.toString());
   const [selectedVibes, setSelectedVibes] = useState<string[]>(userProfile.vibes || []);
   const [photo, setPhoto] = useState<string | null>(userProfile.photo || null);
 
   useEffect(() => {
     if (open) {
       setName(userProfile.name);
       setBio(userProfile.bio);
       setAge(userProfile.age.toString());
       setSelectedVibes(userProfile.vibes || []);
       setPhoto(userProfile.photo || null);
     }
   }, [open, userProfile]);
 
   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
       const reader = new FileReader();
       reader.onload = (e) => {
         setPhoto(e.target?.result as string);
       };
       reader.readAsDataURL(file);
     }
   };
 
   const toggleVibe = (vibeId: string) => {
     setSelectedVibes((prev) =>
       prev.includes(vibeId)
         ? prev.filter((id) => id !== vibeId)
         : prev.length < 10
         ? [...prev, vibeId]
         : prev
     );
   };
 
   const handleSave = () => {
     if (!name.trim()) {
       toast.error("Name is required");
       return;
     }
     
     const ageNum = parseInt(age);
     if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
       toast.error("Please enter a valid age (18-100)");
       return;
     }
 
     onSave({
       name: name.trim(),
       bio: bio.trim(),
       age: age,
       vibes: selectedVibes,
       photo,
     });
     
     toast.success("Profile updated!");
     onOpenChange(false);
   };
 
   return (
     <Sheet open={open} onOpenChange={onOpenChange}>
       <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl overflow-y-auto">
         <SheetHeader className="pb-4">
           <SheetTitle>Edit Profile</SheetTitle>
         </SheetHeader>
 
         <div className="space-y-6 pb-8">
           {/* Photo */}
           <div className="flex justify-center">
             <div className="relative">
               <Avatar className="w-24 h-24">
                 {photo ? (
                   <AvatarImage src={photo} alt={name} className="object-cover" />
                 ) : null}
                 <AvatarFallback className="gradient-primary text-primary-foreground text-2xl font-bold">
                   {name.charAt(0).toUpperCase()}
                 </AvatarFallback>
               </Avatar>
               <label
                 htmlFor="photo-upload"
                 className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg"
               >
                 <Camera className="w-4 h-4 text-primary-foreground" />
                 <input
                   id="photo-upload"
                   type="file"
                   accept="image/*"
                   className="hidden"
                   onChange={handlePhotoChange}
                 />
               </label>
             </div>
           </div>
 
           {/* Name */}
           <div className="space-y-2">
             <Label htmlFor="name">Name</Label>
             <Input
               id="name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder="Your name"
               maxLength={30}
             />
           </div>
 
           {/* Bio */}
           <div className="space-y-2">
             <Label htmlFor="bio">Bio</Label>
             <Textarea
               id="bio"
               value={bio}
               onChange={(e) => setBio(e.target.value)}
               placeholder="Tell us about yourself..."
               maxLength={150}
               rows={3}
             />
             <p className="text-xs text-muted-foreground text-right">
               {bio.length}/150
             </p>
           </div>
 
           {/* Age */}
           <div className="space-y-2">
             <Label htmlFor="age">Age</Label>
             <Input
               id="age"
               type="number"
               value={age}
               onChange={(e) => setAge(e.target.value)}
               min={18}
               max={100}
             />
           </div>
 
           {/* Vibes */}
           <div className="space-y-2">
             <Label>Vibes ({selectedVibes.length}/10)</Label>
             <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
               {vibeOptions.map((vibe) => {
                 const isSelected = selectedVibes.includes(vibe.id);
                 return (
                   <button
                     key={vibe.id}
                     type="button"
                     onClick={() => toggleVibe(vibe.id)}
                     className={cn(
                       "px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5",
                       isSelected
                         ? "bg-primary text-primary-foreground"
                         : "bg-muted text-muted-foreground hover:bg-muted/80"
                     )}
                   >
                     <span>{vibe.emoji}</span>
                     {vibe.label}
                     {isSelected && <Check className="w-3 h-3" />}
                   </button>
                 );
               })}
             </div>
           </div>
 
           {/* Save Button */}
           <Button onClick={handleSave} className="w-full h-12 rounded-full">
             Save Changes
           </Button>
         </div>
       </SheetContent>
     </Sheet>
   );
 };
 
 export default EditProfileSheet;