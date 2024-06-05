import { connect } from "@/helpers/db.config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/helpers/mailer.config";

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    console.log(username);
    console.log(email);
    console.log(password);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
