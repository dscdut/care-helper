import 'package:flutter/material.dart';
import 'package:flutter_template/presentation/auth/views/login_view.dart';
import 'package:flutter_template/presentation/auth/views/phone_input_view.dart';
import 'package:flutter_template/presentation/auth/views/welcome_view.dart';
import 'package:flutter_template/presentation/core/views/root_view.dart';
import 'package:flutter_template/presentation/notification/view/blood_pressure.dart';
import 'package:flutter_template/presentation/notification/view/test_details.dart';
import 'package:flutter_template/presentation/profile/view/profile_detail_view.dart';
import 'package:flutter_template/presentation/profile/view/profile_navigation1_view.dart';
import 'package:flutter_template/presentation/profile/view/profile_view.dart';
import 'package:flutter_template/presentation/splash/splash.dart';

abstract final class AppRouter {
  static const String splash = '/';

  // Auth
  static const String login = '/login';
  static const String register = '/register';
  static const String welcome = '/welcome';

  // Root
  static const String root = '/root';

  // Feature
  static const String bloodPressure = '/blood-pressure';
  static const String testDetails = '/test-details';

  static const String profile = '/profile';
  static const String profile_nav1 = '/profile-nav1';
  static const String profile_detail = '/profile-detail';
  static const String administrative = '/administrative';

  // static final router = GoRouter(
  //   routes: [
  //     GoRoute(
  //       path: login,
  //       pageBuilder: (_, __) {
  //         return const MaterialPage(
  //           child: LoginView(),
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
      case register:
        return MaterialPageRoute(
          builder: (_) {
            return const PhoneInputView();
          },
        );
      case login:
        return MaterialPageRoute(
          builder: (_) {
            return const LoginView();
          },
        );
      case welcome:
        return MaterialPageRoute(
          builder: (_) {
            return const WelcomePage();
          },
        );
      case root:
        return MaterialPageRoute(
          builder: (_) {
            return const RootPage();
          },
        );
      case bloodPressure:
        return MaterialPageRoute(
          builder: (_) {
            return const BloodPressurePage();
          },
        );
      case testDetails:
        return MaterialPageRoute(
          builder: (_) {
            return const TestDetailPage();
          },
        );
      case profile:
        return MaterialPageRoute(
          builder: (_) {
            return const ProfilePage();
          },
        );
      case profile_nav1:
        return MaterialPageRoute(
          builder: (_) {
            return const ProfileNav1View();
          },
        );
      case profile_detail:
        return MaterialPageRoute(
          builder: (_) {
            return const ProfileDetailView();
          },
        );
      // case administrative:
      //   return MaterialPageRoute(
      //     builder: (_) {
      //       return const AdministrativeView();
      //     },
      //   );
      default:
        return null;
    }
  }
}
