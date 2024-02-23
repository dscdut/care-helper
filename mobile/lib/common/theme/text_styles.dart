import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

abstract class TextStyles {
  // Display
  static final TextStyle displayLarge = TextStyle(
    fontSize: 57.sp,
  );

  // Regular
  static const TextStyle regularText = TextStyle(
    fontWeight: FontWeight.w400,
  );
  static const TextStyle s11RegularText = TextStyle(
    fontWeight: FontWeight.w400,
    fontSize: 11,
  );
  static const TextStyle s14RegularText = TextStyle(
    fontWeight: FontWeight.w400,
    fontSize: 14,
  );
  static const TextStyle s17RegularText = TextStyle(
    fontWeight: FontWeight.w400,
    fontSize: 17,
  );
  // New font size 24
  static const TextStyle s24RegularText = TextStyle(
    fontWeight: FontWeight.w400,
    fontSize: 24,
  );

  // Medium
  static const TextStyle mediumText = TextStyle(
    fontWeight: FontWeight.w500,
  );
  static const TextStyle s11MediumText = TextStyle(
    fontWeight: FontWeight.w500,
    fontSize: 11,
  );
  static const TextStyle s14MediumText = TextStyle(
    fontWeight: FontWeight.w500,
    fontSize: 14,
  );
  static const TextStyle s17MediumText = TextStyle(
    fontWeight: FontWeight.w500,
    fontSize: 17,
  );
  // New font size 24
  static const TextStyle s24MediumText = TextStyle(
    fontWeight: FontWeight.w500,
    fontSize: 24,
  );

  // Bold
  static const TextStyle boldText = TextStyle(
    fontWeight: FontWeight.w700,
  );
  static const TextStyle s11BoldText = TextStyle(
    fontWeight: FontWeight.w700,
    fontSize: 11,
  );
  static const TextStyle s14BoldText = TextStyle(
    fontWeight: FontWeight.w700,
    fontSize: 14,
  );
  static const TextStyle s17BoldText = TextStyle(
    fontWeight: FontWeight.w700,
    fontSize: 17,
  );
  // New font size 24
  static const TextStyle s24BoldText = TextStyle(
    fontWeight: FontWeight.w700,
    fontSize: 24,
  );
  static TextStyle boldAppbarTitle = TextStyle(
    color: Colors.black,
    fontWeight: FontWeight.w600,
    fontSize: 20.sp,
  );
}
