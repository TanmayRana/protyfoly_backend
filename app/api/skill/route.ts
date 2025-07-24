/* eslint-disable @typescript-eslint/no-unused-vars */
import SkillsCategory from "@/lib/Schemas/SkillsCategorySchema";
import Skills from "@/lib/Schemas/SkillsSchema";
// import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const filter = category ? { category } : {};
    const skills = await Skills.find(filter).populate("category");
    const SkillData = skills.map((skill) => {
      return {
        _id: skill._id,
        name: skill.name,
        level: skill.level,
        category: skill.category.category,
      };
    });
    return NextResponse.json({ skills: SkillData, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, level, category } = data;

    console.log("data in POST", data);

    // Check if skill already exists
    const existSkill = await Skills.findOne({ name });
    if (existSkill) {
      return NextResponse.json(
        { error: "Skill with this name already exists" },
        { status: 400 }
      );
    }

    // let categoryId = category;

    // If category is NOT a valid ObjectId, treat it as a name
    // if (!mongoose.Types.ObjectId.isValid(category)) {
    //   let categoryDoc = await SkillsCategory.findOne({ category: category });

    //   // Auto-create category if it doesn't exist
    //   if (!categoryDoc) {
    //     categoryDoc = await SkillsCategory.create({ category: category });
    //   }

    //   categoryId = categoryDoc._id;
    // }

    const categoryData = await SkillsCategory.findOne({ category: category });
    console.log("category in POST", category);
    const categoryId = categoryData._id;

    const newSkill = await Skills.create({
      name,
      level,
      category: categoryId,
    });

    return NextResponse.json({ newSkill }, { status: 200 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}

// export async function PUT(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     console.log("id in PUT", id);

//     const { data } = await req.json();
//     console.log("data in PUT", data);

//     const existSkill = await Skills.findOne({ _id: id });
//     console.log("existSkill in PUT", existSkill);

//     if (!existSkill) {
//       return NextResponse.json(
//         { error: "Skill with this name does not exist" },
//         { status: 400 }
//       );
//     }

//     const updatedSkill = await Skills.findOneAndUpdate({ _id: id }, data, {
//       new: true,
//     });
//     console.log("updatedSkill in PUT", updatedSkill);

//     return NextResponse.json({ updatedSkill, status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to update skill" },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing skill ID" }, { status: 400 });
    }

    const data = await req.json();
    const { name, level, category } = data;
    console.log("PUT data received:", data);

    const existSkill = await Skills.findById(id).populate("category");
    if (!existSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    let categoryId = existSkill.category._id; // default: same category

    if (existSkill.category.category !== category) {
      const categoryData = await SkillsCategory.findOne({ category });
      if (!categoryData) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }
      categoryId = categoryData._id;
    }

    const updatedData = { name, level, category: categoryId };

    const updatedSkill = await Skills.findByIdAndUpdate(
      id,
      updatedData, // ✅ Correct structure
      { new: true }
    );

    return NextResponse.json({ updatedSkill }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /api/skills:", error);
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const existSkill = await Skills.findOne({ _id: id });

    if (!existSkill) {
      return NextResponse.json(
        { error: "Skill with this name does not exist" },
        { status: 400 }
      );
    }

    const deletedSkill = await Skills.findOneAndDelete({ _id: id });

    return NextResponse.json({ deletedSkill, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
