const unsignedInteger = seq(
  /\d/,
  repeat(choice('_', /\d/))
);

const signedInteger = seq(
  optional(/[\+-]/), 
  unsignedInteger
);

module.exports = grammar({
  name: 'structured_text',
  
  extras: $ => [
    $.inline_comment,
    $.block_comment,
    /\s/
  ],
  
  word: $ => $.identifier,
  
  conflicts: $ => [
    [$.case],
    [$.variable],
    [$.variable, $.call_expression],
    [$.type_definition, $.variable]
  ],
  
  supertypes: $ => [
    $._definition,
    $.statement,
    $._control_statement,
    $._loop_statement,
    $._expression,
    $._literal
  ],
  
  rules: {
    source_file: $ => repeat(choice(
      $._definition, 
      $._declaration
    )),
    
    _definition: $ => choice(
      $.program_definition,
      $.action_definition,
      $.function_block_definition,
      $.function_definition,
      $.type_definition
    ),
    
    _declaration: $ => choice(
      $.variable_declaration,
    ),

    attribute_block: $ => seq(
      '{',
      repeat(choice(
        $.identifier,
        $.string,
        $.wstring,
        ':=',
        ';',
        ','
      )),
      '}'
    ),
    
    program_definition: $ => seq(
      repeat($.attribute_block),
      'PROGRAM',
      field('programName', $.identifier),
      repeat(choice($._declaration, $.statement)),
      'END_PROGRAM'
    ),
    
    action_definition: $ => seq(
      'ACTION',
      field('ActionName', $.identifier),
      ':',
      repeat($.statement),
      'END_ACTION'
    ),

    function_block_definition: $ => seq(
      repeat($.attribute_block),
      'FUNCTION_BLOCK',
      field('functionBlockName', choice($.identifier, $.wstring)),
      optional(seq('EXTENDS', field('baseType', $._data_type))),
      repeat(choice($._declaration, $.statement)),
      'END_FUNCTION_BLOCK'
    ),

    function_definition: $ => seq(
      repeat($.attribute_block),
      'FUNCTION',
      field('functionName', $.identifier),
      ':',
      field('returnType', $._data_type),
      repeat(choice($._declaration, $.statement)),
      'END_FUNCTION'
    ),

    type_definition: $ => seq(
      repeat($.attribute_block),
      'TYPE',
      field('typeName', $.identifier),
      ':',
      field('type', choice($.enum_type, $.struct_type, $._data_type)),
      optional(';'),
      'END_TYPE'
    ),

    enum_type: $ => seq(
      '(',
      commaSep1($.enum_value),
      optional(','),
      ')',
      optional($._data_type)
    ),

    enum_value: $ => seq(
      field('name', $.identifier),
      optional(seq(':=', field('value', $._expression)))
    ),

    struct_type: $ => seq(
      'STRUCT',
      repeat($.variable_declaration_item),
      'END_STRUCT'
    ),
    
    constant_declaration: $ => seq(
      'VAR', 'CONSTANT',
      repeat($.constant),
      'END_VAR'
    ),
    
    /* 
      Statements
    */
    
    statement: $ => choice(
      $.assignment,
      $.return_statement,
      $.expression_statement,
      $.call_statement,
      $._control_statement,
      $._loop_statement,
      $.continue_statement,
      $.exit_statement
    ),

    continue_statement: $ => seq('CONTINUE', optional(';')),

    exit_statement: $ => seq('EXIT', optional(';')),

    return_statement: $ => seq('RETURN', optional(';')),
    
    _control_statement: $ => choice(
      $.case_statement,
      $.if_statement
    ),
    
    _loop_statement: $ => choice(
      $.for_statement,
      $.repeat_statement,
      $.while_statement
    ),
    
    assignment: $ => seq(
      $.variable,
      ':=',
      $._expression,
      ';'
    ),
    
    expression_statement: $ => seq($.variable, ';'),
    
    call_statement: $ => seq($.call_expression, ';'),
    
    if_statement: $ => seq(
      'IF',
      field('condition', $._expression),
      'THEN',
      repeat($.statement),
      repeat($.elseif_clause),
      optional($.else_clause),
      'END_IF',
      optional(';')
    ),
    
    case_statement: $ => seq(
      'CASE',
      field('caseControlValue', $._expression),
      'OF',
      repeat($.case),
      optional($.else_case),
      'END_CASE',
      optional(';')
    ),
    
    for_statement: $ => seq(
      'FOR',
      $.for_range,
      'DO',
      repeat($.statement),
      'END_FOR',
      optional(';')
    ),
    
    repeat_statement: $ => seq(
      'REPEAT',
      repeat($.statement),
      'UNTIL',
      field('terminationCondition', $._expression),
      'END_REPEAT',
      optional(';')
    ),
    
    while_statement: $ => seq(
      'WHILE',
      $._expression,
      'DO',
      repeat($.statement),
      'END_WHILE',
      optional(';')
    ),
    
    /*
      Statement components
    */
    
    elseif_clause: $ => seq(
      'ELSIF',
      field('elsifCondition', $._expression),
      'THEN',
      repeat($.statement)
    ),
    
    else_clause: $ => seq(
      'ELSE',
      repeat($.statement)
    ),
    
    case: $ => seq(
      $.case_value,
      ':',
      repeat($.statement)
    ),
    
    else_case: $ => seq(
      'ELSE',
      repeat($.statement)
    ),
    
    case_value: $ => commaSep1(choice(
      alias(token(signedInteger), $.integer),
      $.index_range,
      $.variable
    )),
    
    index_range: $ => seq(
      field('lowerBound', choice(alias(token(signedInteger), $.integer), $.identifier)),
      '..',
      field('upperBound', choice(alias(token(signedInteger), $.integer), $.identifier))
    ),
    
    for_range: $ => seq(
      $.statement_initialization,
      'TO',
      $._expression,
      optional(seq('BY', $._expression))
    ),
    
    statement_initialization: $ => seq(
      $.variable, 
      ':=', 
      $._expression
    ),
    
    /*
      Declarations
    */
    
    constant: $ => seq(
      field('name', $.identifier),
      ':',
      $._data_type, 
      $.variable_initialization
    ),

    variable_declaration: $ => seq(
      repeat($.attribute_block),
      choice(
        'VAR',
        'VAR_INPUT',
        'VAR_OUTPUT',
        'VAR_IN_OUT',
        'VAR_TEMP',
        'VAR_GLOBAL'
      ),
      optional('CONSTANT'),
      repeat($.variable_declaration_item),
      'END_VAR'
    ),

    variable_declaration_item: $ => seq(
      commaSep1(field('name', $.identifier)),
      repeat($.attribute_block),
      optional(seq('AT', field('address', $.direct_address))),
      ':',
      field('type', $._data_type),
      optional($.variable_initializer),
      ';'
    ),

    direct_address: $ => token(seq(
      '%',
      optional(/[IQM]/),
      choice('X', 'B', 'W', 'D', 'L'),
      /\d+/,
      optional(seq('.', /\d+/))
    )),
    
    /*
      Declaration components
    */
    variable_initialization: $ => seq(
      ':=',
      choice(
        commaSep1(choice($._expression, $.repetition_expression)),
        seq('[', commaSep1(choice($._expression, $.repetition_expression)), ']')
      ),
      ';'
    ),

    variable_initializer: $ => seq(
      ':=',
      choice(
        commaSep1(choice($._expression, $.repetition_expression)),
        seq('[', commaSep1(choice($._expression, $.repetition_expression)), ']')
      )
    ),
    
    /*
      Expressions
    */
    
    _expression: $ => choice(
      $._literal,
      $.variable,
      $.parenthesis_expression,
      $.unary_expression,
      $.binary_expression,
      $.mask_expression,
      $.call_expression
    ),
    
    parenthesis_expression: $ => seq('(', $._expression, ')'),
    
    unary_expression: $ => prec(6, choice(
      seq('NOT', $._expression),
      seq('+', $._expression),
      seq('-', $._expression)
    )),
    
    binary_expression: $ => choice(
      prec.left(5, seq($._expression, '**', $._expression)), // Not supported in Automation Studio
      prec.left(4, seq($._expression, '*', $._expression)),
      prec.left(4, seq($._expression, '/', $._expression)),
      prec.left(4, seq($._expression, 'MOD', $._expression)),
      prec.left(3, seq($._expression, '+', $._expression)),
      prec.left(3, seq($._expression, '-', $._expression)),
      prec.left(2, seq($._expression, '<', $._expression)),
      prec.left(2, seq($._expression, '>', $._expression)),
      prec.left(2, seq($._expression, '<=', $._expression)),
      prec.left(2, seq($._expression, '>=', $._expression)),
      prec.left(1, seq($._expression, '=', $._expression)),
      prec.left(1, seq($._expression, '<>', $._expression)),
      prec.left(0, seq($._expression, 'AND', $._expression)),
      prec.left(0, seq($._expression, 'XOR', $._expression)),
      prec.left(0, seq($._expression, 'OR', $._expression))
    ),
    
    parameter_assignment: $ => seq(
      alias($.identifier, $.parameter),
      ':=',
      $._expression
    ),
    
    call_expression: $ => prec(8, seq(
      field('functionName', choice($.identifier, $.variable)),
      optional($.index), // Only for function block instances
      '(',
      commaSep(field('input', choice($.parameter_assignment, $._expression))), // Function calls have ordered lists allowing expressions
      ')'
    )),
    
    mask_expression: $ => seq(
      $.variable, 
      token.immediate('.'), 
      /\d{1,2}/
    ),
    
    repetition_expression: $ => seq(
      $._expression,
      '(', $._expression, ')'
    ),
    
    /*
      Variables
    */
    
    variable: $ => seq(
      field('name', $.identifier),
      repeat(choice($.index, $.pointer_dereference, $.structure_member, $.bit_access))
    ),
    
    index: $ => seq(
      '[',
      field('dim1', $._expression),
      optional(seq(',', field('dim2', $._expression))),
      ']'
    ),
    
    pointer_dereference: $ => token.immediate('^'),

    structure_member: $ => seq(token.immediate('.'), $.identifier),

    bit_access: $ => seq(token.immediate('.'), alias(token.immediate(/\d{1,2}/), $.integer)),
    
    /*
      Data types
    */
    _data_type: $ => choice(
      $.basic_data_type,
      $.string_type,
      $.pointer_type,
      alias($.identifier, $.derived_data_type),
      alias($.wstring, $.derived_data_type),
      $.array_type
    ),
    
    basic_data_type: $ => choice(
      'BOOL',
      'SINT',
      'INT',
      'DINT',
      'LINT',
      'USINT',
      'UINT',
      'UDINT',
      'ULINT',
      'REAL',
      'LREAL',
      'TIME',
      'DATE',
      'TIME_OF_DAY',
      'TOD',
      'DATE_AND_TIME',
      'DT',
      'STRING',
      'WSTRING',
      'BYTE',
      'WORD',
      'DWORD',
      'LWORD'
    ),

    string_type: $ => seq(
      choice('STRING', 'WSTRING'),
      '(',
      choice($.integer, $.identifier),
      ')'
    ),

    pointer_type: $ => seq(
      'POINTER',
      'TO',
      $._data_type
    ),
    
    array_type: $ => seq(
      'ARRAY',
      '[',
      commaSep1($.index_range),
      ']',
      'OF',
      $._data_type
    ),
    
    /*
      Literals
    */
    
    _literal: $ => choice(
      $.boolean,
      $.integer,
      $.floating_point,
      $.binary,
      $.octal,
      $.hexidecimal,
      $.time,
      $.date,
      $.time_of_day,
      $.date_and_time,
      $.string,
      $.wstring
    ),
    
    boolean: $ => token(choice('TRUE', 'FALSE')),
    
    integer: $ => {
      return token(unsignedInteger);
    },
    
    floating_point: $ => {
      const scientific = seq(/[eE]/, signedInteger);
      return token(seq(
        unsignedInteger,
        choice(
          seq(
            '.',
            repeat(choice('_', /\d/)),
            optional(scientific)
          ),
          scientific
        )
      ));
    },
    
    binary: $ => token(seq('2#', /_*[0-1]/, repeat(choice('_', /[0-1]/)))),
    
    octal: $ => token(seq('8#', /_*[0-7]/, repeat(choice('_', /[0-7]/)))),
    
    hexidecimal: $ => token(seq('16#', /_*[0-9a-fA-F]/, repeat(choice('_', /[0-9a-fA-F]/)))),
    
    time: $ => token(seq(
      'T#',
      optional('-'),
      optional(/\d{1,2}[dD]/),
      optional(/\d{1,3}[hH]/),
      optional(/\d{1,5}[mM]/),
      optional(/\d{1,9}[sS]/),
      optional(/\d{1,9}((ms)|(MS))/)
    )),
    
    date: $ => token(seq(
      'D#',
      /\d(_?\d){3}/, // Year
      /(-\d(_?\d)?){2}/ // Month and day
    )),
    
    time_of_day: $ => token(seq(
      'TOD#',
      /\d(_?\d)?/,
      ':',
      /\d(_?\d)?/,
      optional(seq(
        ':',
        /\d(_?\d)?/,
        optional(seq('.', /\d(_?\d)*/))
      ))
    )),
    
    date_and_time: $ => seq(
      'DT#',
      /\d(_?\d){3}/, // Year
      /(-\d(_?\d)?){3}/, // Month, day, hour
      /(:\d(_?\d)?){1,2}/ // Minute, second
    ),
    
    string: $ => token(seq(
      '\'',
      repeat(choice(/[^'\r\n]/, "''")),
      '\''
    )),
    
    wstring: $ => token(seq(
      '"',
      repeat(choice(/[^"\r\n]/, '""')),
      '"'
    )),
    
    inline_comment: $ => token(seq('//', /.*/)),
    
    // http://stackoverflow.com/questions/13014947/regex-to-match-a-c-style-multiline-comment/36328890#36328890
    block_comment: $ => token(seq(
      '(*',
      /[^*]*\*+([^*)][^*]*\*+)*/,
      ')'
    )),
    
    identifier: $ => /[a-zA-Z_]\w*/,
    
  }
  
});

function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)));
}

function commaSep(rule) {
  return optional(commaSep1(rule));
}
