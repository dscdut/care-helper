import 'package:flutter/material.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';

class Header extends StatelessWidget {
  const Header({
    required this.heading1,
    required this.heading2,
    Key? key,
  }) : super(key: key);

  final String heading1;
  final String heading2;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            context.themeConfig.startBackgroundColor,
            context.themeConfig.endBackgroundColor,
          ],
        ),
      ),
      height: MediaQuery.of(context).size.height * 0.25,
      width: MediaQuery.of(context).size.width,
      child: Container(
        margin: const EdgeInsets.only(left: 16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              heading1,
              style: context.headlineLarge.copyWith(
                color: context.themeConfig.scaffoldBackgroundColor,
              ),
            ),
            Text(
              heading2,
              style: context.headlineSmall.copyWith(
                color: context.themeConfig.scaffoldBackgroundColor,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
