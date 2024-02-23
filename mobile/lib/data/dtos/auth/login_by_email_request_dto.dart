import 'package:json_annotation/json_annotation.dart';

part 'login_by_email_request_dto.g.dart';

@JsonSerializable(createFactory: false)
class LoginByEmailRequestDTO {
  LoginByEmailRequestDTO({
    required this.phone,
    required this.password,
  });
  final String phone;
  final String password;

  Map<String, dynamic> toJson() => _$LoginByEmailRequestDTOToJson(this);
}
