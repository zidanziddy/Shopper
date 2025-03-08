import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { getDocs, where, query, collection } from "firebase/firestore";
import { db } from "@/app/firebase/config";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your Name" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        async function debugFirestore() {
          const usersCollection = collection(db, "users");
          const snapshot = await getDocs(usersCollection);
          
          console.log("Firestore Users:");
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
          });
        }
        debugFirestore();
        console.log("Received credentials:", credentials);

        if (!credentials?.username || !credentials?.password) {
          console.error("Missing username or password");
          throw new Error("Missing username or password");
        }

        // Query Firestore to find the user
        const q = query(collection(db, "users"), where("email", "==", credentials.username));
        const querySnapshot = await getDocs(q);

        console.log("Query snapshot size:", querySnapshot.size);

        if (querySnapshot.empty) {
          console.error("User not found in Firestore");
          throw new Error("Invalid username or password");
        }

        const userDoc = querySnapshot.docs[0]; // Assuming username is unique
        const user = userDoc.data();

        console.log("User found in Firestore:", user);

        
        if (credentials.password !== user.password) {
          console.error("Password mismatch");
          throw new Error("Invalid username or password");
        }

        console.log("User authenticated successfully");

        return {
          id: userDoc.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
