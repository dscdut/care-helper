import 'package:flutter/material.dart';
import 'package:flutter_template/presentation/auth/views/login_view.dart';
import 'package:flutter_template/presentation/auth/views/register_view.dart';
import 'package:flutter_template/presentation/auth/views/welcome_view.dart';
import 'package:flutter_template/presentation/core/views/root_view.dart';
import 'package:flutter_template/presentation/greeting/views/greeting_view.dart';
import 'package:flutter_template/presentation/splash/splash.dart';

abstract final class AppRouter {
  static const String splash = '/';

  // Auth
  static const String login = '/login';
  static const String register = '/register';
  static const String welcome = '/welcome';
  static const String phoneInput = '/phone-input';

  // Root
  static const String root = '/root';

  // static final router = GoRouter(
  //   routes: [
  //     GoRoute(
  //       path: login,
  //       pageBuilder: (_, __) {
  //         return const MaterialPage(
  //           child: LoginPage(),
  //         );
  //       },
  //     ),
  //     GoRoute(
  //       path: register,
  //       pageBuilder: (_, __) {
  //         return const MaterialPage(
  //           child: RegisterView(),
  //         );
  //       },
  //     ),
  //     GoRoute(
  //       path: root,
  //       pageBuilder: (_, __) {
  //         return const MaterialPage(
  //           child: RootPage(),
  //         );
  //       },
  //     )
  //   ],
  //   initialLocation: login,
  // );

  static Route? onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case splash:
        return MaterialPageRoute(
          builder: (_) {
            return const SplashPage();
          },
        );
      case phoneInput:
      case welcome:
        return MaterialPageRoute(
          builder: (_) {
            return const WelcomePage();
          },
        );
      case register:
        return MaterialPageRoute(
          builder: (_) {
            return const RegisterView();
          },
        );
      case login:
        return MaterialPageRoute(
          builder: (_) {
            return const LoginView();
          },
        );
      case root:
        return MaterialPageRoute(
          builder: (_) {
            return const RootPage();
          },
        );
      case register:
        return MaterialPageRoute(
          builder: (_) {
            return const GreetingView();
          },
        );
      default:
        return null;
    }
  }
}
