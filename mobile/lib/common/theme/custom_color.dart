// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';

class CustomColor extends ThemeExtension<CustomColor> {
  final Color? primaryW800;
  final Color? primaryW600;
  final Color? primaryW100;
  final Color? accent;

  
  LinearGradient get linearGradient {
    return LinearGradient(
      colors: [primaryW800!, primaryW600!],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    );
  }

  CustomColor({
    this.primaryW800,
    this.primaryW600,
    this.primaryW100,
    this.accent,
  });

  @override
  CustomColor copyWith({
    Color? primaryW800,
    Color? primaryW600,
    Color? primaryW100,
    Color? accent,
  }) {
    return CustomColor(
      primaryW800: primaryW800 ?? this.primaryW800,
      primaryW600: primaryW600 ?? this.primaryW600,
      primaryW100: primaryW100 ?? this.primaryW100,
      accent: accent ?? this.accent,
    );
  }

  @override
  CustomColor lerp(CustomColor? other, double t) {
    if (other is! CustomColor) {
      return this;
    }
    return CustomColor(
      primaryW800: Color.lerp(primaryW800, other.primaryW800, t),
      primaryW100: Color.lerp(primaryW100, other.primaryW100, t),
      primaryW600: Color.lerp(primaryW600, other.primaryW600, t),
      accent: Color.lerp(accent, other.accent, t),
    );
  }
}
