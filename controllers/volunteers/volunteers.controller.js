import prisma from "../../config/prisma.js";

export const createVolunteerProfile = async (req, res) => {
  try {
    const { phone, age, gender, skills, availability, address, occupation } =
      req.body;

    const existingVolunteer = await prisma.volunteer.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (existingVolunteer) {
      return res.status(409).json({
        success: false,
        message: "Volunteer profile already exists",
      });
    }

    const volunteer = await prisma.volunteer.create({
      data: {
        userId: req.user.userId,
        phone,
        age,
        gender,
        skills,
        availability,
        address,
        occupation,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Volunteer profile created successfully",
      volunteer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyVolunteerProfile = async (req, res) => {
  try {
    const volunteer = await prisma.volunteer.findUnique({
      where: {
        userId: req.user.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      volunteer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateVolunteerProfile = async (req, res) => {
  try {
    const volunteer = await prisma.volunteer.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer profile not found",
      });
    }

    const updatedVolunteer = await prisma.volunteer.update({
      where: {
        userId: req.user.userId,
      },
      data: req.body,
    });

    return res.status(200).json({
      success: true,
      message: "Volunteer profile updated successfully",
      volunteer: updatedVolunteer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllVolunteers = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);

    const skip = (page - 1) * limit;

    const [volunteers, totalVolunteers] = await Promise.all([
      prisma.volunteer.findMany({
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.volunteer.count(),
    ]);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalVolunteers / limit),
      totalVolunteers,
      count: volunteers.length,
      volunteers,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateVolunteerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const volunteer = await prisma.volunteer.findUnique({
      where: {
        id,
      },
    });

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer profile not found",
      });
    }

    const allowedStatuses = ["PENDING", "APPROVED", "REJECTED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const updatedVolunteer = await prisma.volunteer.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Volunteer status updated successfully",
      volunteer: updatedVolunteer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
