import 'package:json_annotation/json_annotation.dart';

part 'user_model.g.dart';

@JsonSerializable(createToJson: false)
class UserModel {
  UserModel({
    required this.id,
    required this.email,
    required this.fullName,
    required this.gender,
    required this.phone,
    required this.birthday,
    required this.avatar,
    required this.address,
    required this.nationalIdCard,
    required this.insurance,
    required this.profession,
    required this.active,
    required this.weight,
    required this.height,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);

  final int id;
  final String email;
  final String fullName;
  final String gender;
  final String phone;
  final String birthday;
  final String avatar;
  final String address;
  final String nationalIdCard;
  final String insurance;
  final String profession;
  final bool active;
  final String weight;
  final String height;
}