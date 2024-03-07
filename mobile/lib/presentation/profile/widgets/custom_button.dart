import 'package:flutter/material.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';

class CustomButton extends StatelessWidget {
  const CustomButton({
    super.key,
    this.text,
    this.widget,
    required this.width,
    required this.height,
    this.textSize,
    this.color,
    this.onPressed,
  });

  final String? text;
  final Widget? widget;
  final double width;
  final double height;
  final double? textSize;
  final Color? color;
  final Function()? onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: color ?? context.themeConfig.darkColorButton,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      onPressed: onPressed ?? () {},
      child: Container(
        width: width,
        height: height,
        alignment: Alignment.center,
        child: widget ??
            Text(
              text!,
              style: TextStyle(
                fontSize: textSize,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
      ),
    );
  }
}
