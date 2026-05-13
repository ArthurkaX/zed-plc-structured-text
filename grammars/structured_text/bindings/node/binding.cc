#include <node.h>
#include <v8.h>

#include "tree_sitter/parser.h"

extern "C" const TSLanguage *tree_sitter_structured_text();

namespace {

using v8::External;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;

void Init(Local<Object> exports) {
  Isolate *isolate = Isolate::GetCurrent();
  exports
      ->Set(isolate->GetCurrentContext(),
            String::NewFromUtf8(isolate, "language").ToLocalChecked(),
            External::New(isolate, const_cast<TSLanguage *>(
                                      tree_sitter_structured_text())))
      .Check();
}

}  // namespace

NODE_MODULE(tree_sitter_structured_text_binding, Init)
