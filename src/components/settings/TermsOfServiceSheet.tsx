 import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
 import { ScrollArea } from "@/components/ui/scroll-area";
 
 interface TermsOfServiceSheetProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 const TermsOfServiceSheet = ({ open, onOpenChange }: TermsOfServiceSheetProps) => {
   return (
     <Sheet open={open} onOpenChange={onOpenChange}>
       <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
         <SheetHeader className="mb-4">
           <SheetTitle className="text-2xl font-bold">Terms of Service</SheetTitle>
           <p className="text-sm text-muted-foreground">Last Updated: February 2026</p>
         </SheetHeader>
         
         <ScrollArea className="h-[calc(90vh-120px)] pr-4">
           <div className="space-y-6 text-sm text-foreground pb-8">
             <section>
               <h3 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h3>
               <p className="text-muted-foreground leading-relaxed">
                 By accessing or using Radius ("the App"), you agree to be bound by these Terms of Service. 
                 If you do not agree to these terms, you must not access or use the App. These terms are 
                 governed by and construed in accordance with the laws of India, including the Information 
                 Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (DPDP Act).
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">2. Eligibility</h3>
               <p className="text-muted-foreground leading-relaxed">
                 You must be at least 18 years of age to use this App. By using the App, you represent and 
                 warrant that you are at least 18 years old and have the legal capacity to enter into these 
                 Terms. As per the DPDP Act, 2023, processing of personal data of children (under 18 years) 
                 requires verifiable parental consent, which we do not support. Therefore, minors are 
                 prohibited from using this App.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">3. User Account & Registration</h3>
               <p className="text-muted-foreground leading-relaxed mb-2">
                 To use certain features of the App, you must register for an account. You agree to:
               </p>
               <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                 <li>Provide accurate, current, and complete information during registration</li>
                 <li>Maintain the security of your password and account credentials</li>
                 <li>Promptly update any changes to your information</li>
                 <li>Accept responsibility for all activities that occur under your account</li>
                 <li>Not share your account credentials with any third party</li>
               </ul>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">4. Prohibited Conduct</h3>
               <p className="text-muted-foreground leading-relaxed mb-2">
                 You agree not to engage in any of the following prohibited activities:
               </p>
               <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                 <li>Harassment, bullying, stalking, or threatening other users</li>
                 <li>Posting or sharing obscene, defamatory, or offensive content as defined under Section 67 of the IT Act, 2000</li>
                 <li>Impersonating another person or entity</li>
                 <li>Sharing content that promotes hatred based on religion, caste, ethnicity, gender, or nationality</li>
                 <li>Soliciting money or engaging in fraudulent activities</li>
                 <li>Sharing sexually explicit material or engaging in sexual exploitation</li>
                 <li>Using the App for any unlawful purpose under Indian law</li>
                 <li>Attempting to bypass security features or access unauthorized areas</li>
                 <li>Scraping, data mining, or automated collection of user data</li>
                 <li>Commercial solicitation without prior written consent</li>
               </ul>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">5. Content Standards</h3>
               <p className="text-muted-foreground leading-relaxed">
                 All content you post must comply with applicable Indian laws including but not limited to 
                 the IT Act, 2000, the Indian Penal Code, and the DPDP Act, 2023. We reserve the right to 
                 remove any content that violates these standards without prior notice. Content deemed 
                 harmful to national security, public order, or decency as per IT Rules, 2021 will be 
                 immediately removed and may be reported to appropriate authorities.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">6. Location Services</h3>
               <p className="text-muted-foreground leading-relaxed">
                 The App uses your location data to provide its core functionality. By enabling location 
                 services, you consent to the collection and use of your location data as described in our 
                 Privacy Policy. You may disable location services at any time through your device settings 
                 or App settings, though this may limit App functionality. Your location data is processed 
                 in accordance with the DPDP Act, 2023.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">7. Safety & Reporting</h3>
               <p className="text-muted-foreground leading-relaxed">
                 We are committed to user safety. You can report any user, content, or behavior that 
                 violates these Terms through our in-app reporting feature. We will investigate reports 
                 and take appropriate action, which may include warning, suspension, or permanent ban of 
                 violating accounts. As per IT Rules, 2021, we will respond to grievances within 24 hours 
                 of receipt and resolve them within 15 days.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">8. Intellectual Property</h3>
               <p className="text-muted-foreground leading-relaxed">
                 All intellectual property rights in the App, including trademarks, logos, and software, 
                 are owned by Radius or its licensors. You are granted a limited, non-exclusive, 
                 non-transferable license to use the App for personal, non-commercial purposes. You may 
                 not copy, modify, distribute, or create derivative works without express written permission.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">9. Disclaimer of Warranties</h3>
               <p className="text-muted-foreground leading-relaxed">
                 The App is provided "as is" and "as available" without warranties of any kind, either 
                 express or implied. We do not guarantee that the App will be uninterrupted, secure, or 
                 error-free. We are not responsible for the conduct of any user, whether online or offline. 
                 You use the App at your own risk.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">10. Limitation of Liability</h3>
               <p className="text-muted-foreground leading-relaxed">
                 To the maximum extent permitted by Indian law, we shall not be liable for any indirect, 
                 incidental, special, consequential, or punitive damages arising from your use of the App. 
                 Our total liability shall not exceed the amount paid by you, if any, for using the App 
                 in the twelve (12) months preceding the claim.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">11. Termination</h3>
               <p className="text-muted-foreground leading-relaxed">
                 We may suspend or terminate your account at any time for violation of these Terms or for 
                 any other reason at our sole discretion. Upon termination, your right to use the App will 
                 immediately cease. You may also delete your account at any time through the App settings. 
                 Provisions that by their nature should survive termination will survive.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">12. Governing Law & Dispute Resolution</h3>
               <p className="text-muted-foreground leading-relaxed">
                 These Terms shall be governed by and construed in accordance with the laws of India. Any 
                 dispute arising out of or relating to these Terms shall be subject to the exclusive 
                 jurisdiction of the courts in Bengaluru, Karnataka, India. Before initiating any legal 
                 proceedings, parties agree to attempt resolution through mediation.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">13. Grievance Officer</h3>
               <p className="text-muted-foreground leading-relaxed">
                 In accordance with the Information Technology Act, 2000 and IT Rules, 2021, the details 
                 of the Grievance Officer are provided within the App's Help Center. You may contact the 
                 Grievance Officer for any complaints or concerns regarding the App or these Terms. 
                 Complaints will be acknowledged within 24 hours and resolved within 15 days.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">14. Changes to Terms</h3>
               <p className="text-muted-foreground leading-relaxed">
                 We reserve the right to modify these Terms at any time. We will notify you of any material 
                 changes through the App or via email. Your continued use of the App after such modifications 
                 constitutes your acceptance of the updated Terms. If you do not agree to the updated Terms, 
                 you must stop using the App and delete your account.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">15. Contact Information</h3>
               <p className="text-muted-foreground leading-relaxed">
                 For questions about these Terms of Service, please contact us through the Help Center 
                 available in the App settings. We are committed to responding to your inquiries in a 
                 timely manner as per applicable Indian regulations.
               </p>
             </section>
           </div>
         </ScrollArea>
       </SheetContent>
     </Sheet>
   );
 };
 
 export default TermsOfServiceSheet;