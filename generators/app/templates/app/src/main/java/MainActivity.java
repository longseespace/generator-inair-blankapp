package <%=packageName%>;

import android.os.Bundle;

import inair.app.IAActivity;

public class MainActivity extends IAActivity {

  public static final String TAG = "<%=appName%>";

  @Override
  public void onInitialize(Bundle bundle) {
    setRootContentView(R.layout.activity_main);
  }
}
